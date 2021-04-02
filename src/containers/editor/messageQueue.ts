import * as monaco from 'monaco-editor'
import FileSocket from './fileSocket'
import { getProject } from '@src/config/project'

export default class MessageQueue {
  private queue: monaco.editor.IModelContentChangedEvent[] = []
  private messageQueue: monaco.editor.IModelContentChangedEvent[] = []
  private relative: string
  private project: string
  private flagSend: boolean = false
  private shouldSave: boolean = false
  private saveCallback: null | Function = null

  constructor(relative: string) {
    this.relative = relative
    this.project = getProject()
    FileSocket.on(this.receipt)
  }

  edit(e: monaco.editor.IModelContentChangedEvent) {
    this.queue.push(e)
    this.messageQueue.push(e)
    this.send()
  }

  getVersion() {
    const last = this.last()
    return {
      versionId: last.versionId + 1,
      startVersionId: this.queue[0].versionId,
      endVersionId: last.versionId
    }
  }

  save(cb: Function | null) {
    const last = this.last()
    if (!last || this.flagSend) {
      this.shouldSave = true
      return
    }
    this.shouldSave = false
    this.saveCallback = cb
    FileSocket.send(this.relative, this.project, 'save', {
      ...this.getVersion()
    })
  }

  last() {
    return this.queue[this.queue.length - 1]
  }

  clear() {
    this.queue = []
    this.messageQueue = []
    this.saveCallback = null
  }

  send() {
    if (this.flagSend) return
    // 取出第一个发送
    const e = this.messageQueue.shift()
    if (e) {
      this.flagSend = true
      FileSocket.send(this.relative, this.project, 'edit', e)
    } else if (this.shouldSave) {
      // 队列已空并且需要保存
      this.save(this.saveCallback)
    }
  }

  receipt = (msg: MessageEvent) => {
    const data = JSON.parse(msg.data)
    const { ok, receipt } = data
    const { relative, versionId, type } = receipt
    if (relative !== this.relative) return
    if (ok) {
      if (type === 'edit') {
        this.flagSend = false
        this.send()
      } else if (type === 'save' || type === 'postall') {
        this.saveCallback && this.saveCallback()
        this.clear()
      }
    } else {
      if (type === 'save') {
        // 一次性重发所有
        FileSocket.send(this.relative, this.project, 'postall', {
          ...this.getVersion(),
          changes: this.queue
        })
      }
    }
  }
}
