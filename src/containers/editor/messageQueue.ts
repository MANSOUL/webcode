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

  save() {
    const last = this.last()
    if (!last || this.flagSend) {
      this.shouldSave = true
      return
    }
    this.shouldSave = false
    FileSocket.send(this.relative, this.project, 'save', {
      versionId: last.versionId + 1,
      startVersionId: this.queue[0].versionId,
      endVersionId: last.versionId
    })
  }

  last() {
    return this.queue[this.queue.length - 1]
  }

  clear() {
    this.queue = []
    this.messageQueue = []
  }

  send() {
    if (this.flagSend) return
    // 取出第一个发送
    const e = this.messageQueue.shift()
    console.log(e)
    if (e) {
      this.flagSend = true
      FileSocket.send(this.relative, this.project, 'edit', e)
    } else if (this.shouldSave) {
      // 队列已空并且需要保存
      this.save()
    }
  }

  receipt = (msg: MessageEvent) => {
    const data = JSON.parse(msg.data)
    const { relative, versionId, type } = data
    if (relative !== this.relative) return
    if (type === 'edit') {
      this.flagSend = false
      this.send()
    } else {
      this.clear()
    }
  }
}
