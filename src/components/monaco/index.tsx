import React from 'react'
import * as monaco from 'monaco-editor'
import { overrideLanguage, registerLanguage } from '@src/theme/editor'

registerLanguage(monaco)
overrideLanguage(monaco)

export interface Props {
  fileName: string
  fileContent: string
}

export default class Editor extends React.Component<Props> {
  refEditor: React.RefObject<HTMLDivElement>
  editor: monaco.editor.IStandaloneCodeEditor | undefined
  onSaveEvents: (() => void)[] = []

  constructor(props: Props) {
    super(props)
    this.refEditor = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    this.initMonaco()
  }

  componentWillUnmount() {
    this.editor?.getModel()?.dispose()
    this.editor?.dispose()
  }

  editorWillMount = () => {}

  editorDidMount = () => {
    // grammerAdapter(monaco, this.editor).then(() => {})
  }

  initMonaco = () => {
    if (this.refEditor.current) {
      // Before initializing monaco editor
      this.editorWillMount()
      this.editor = monaco.editor.create(this.refEditor.current, {
        fontSize: 14
      })
      this.setMode(this.props.fileName, this.props.fileContent)
      this.addKeyBind()
      // After initializing monaco editor
      this.editorDidMount()
    }
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
      monaco.Uri.parse(fileName)
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
