import React from 'react'
import * as monaco from 'monaco-editor'
//@ts-ignore
import vsCodeTheme from '@src/theme/assets/monacoTheme'
import { convertTheme } from 'monaco-vscode-textmate-theme-converter'
import converter from '@src/theme/editor/converter'

export interface Props {}

monaco.editor.defineTheme('webcodeTheme', vsCodeTheme)

export default class Editor extends React.Component<Props> {
  refEditor: React.RefObject<HTMLDivElement>
  editor: monaco.editor.IStandaloneCodeEditor | undefined
  onSaveEvents: (() => void)[] = []

  constructor(props: Props) {
    super(props)
    this.refEditor = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    converter(monaco)
    if (this.refEditor.current) {
      const editor = monaco.editor.create(this.refEditor.current, {
        theme: 'webcodeTheme'
      })
      this.editor = editor
      this.addKeyBind()
    }
  }

  componentWillUnmount() {
    this.editor?.getModel()?.dispose()
    this.editor?.dispose()
  }

  onCursorChange(
    callback: (cursor: {
      row: number
      col: number
      selectedColCount: number
    }) => void
  ) {
    if (!this.editor) return
    this.editor.onDidChangeCursorSelection(e => {
      const selection = e.selection
      callback({
        row: selection.positionLineNumber,
        col: selection.positionColumn,
        selectedColCount:
          this.editor?.getModel()?.getValueInRange(selection).length || 0
      })
    })
  }

  resize() {
    this.editor && this.editor.layout()
  }

  setValue(val: string, cursorPos?: number) {
    this.editor && this.editor.setValue(val)
  }

  focus() {
    this.editor && this.editor.focus()
  }

  onValueChange(
    callback: (delta: monaco.editor.IModelContentChangedEvent) => void
  ) {
    if (!this.editor) return
    this.editor.getModel()?.onDidChangeContent(callback)
  }

  onInput(callback: () => void) {
    if (!this.editor) return
    this.editor.getModel()?.onDidChangeContent(callback)
  }

  onSave(callback: () => void) {
    if (!this.editor) return
    this.onSaveEvents.push(callback)
  }

  setMode(fileName: string, value: string) {
    const model = monaco.editor.createModel(
      value,
      undefined,
      monaco.Uri.file(fileName)
    )
    this.editor && this.editor.setModel(model)
  }

  getValue() {
    return this.editor?.getValue() || ''
  }

  addKeyBind() {
    if (!this.editor) return
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.onSaveEvents.forEach(cb => cb())
    })
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.refEditor}></div>
    )
  }
}
