import React from 'react'
import ace from 'ace-builds'
import { getModeForPath } from 'ace-builds/src-noconflict/ext-modelist'

ace.config.set('basePath', 'http://ajaxorg.github.io/ace-builds/src-noconflict')
ace.config.set('fontSize', 15)

export interface Props {}

export default class Editor extends React.Component<Props> {
  refEditor: React.RefObject<HTMLDivElement>
  aceEditor: ace.Ace.Editor | undefined

  constructor(props: Props) {
    super(props)
    this.refEditor = React.createRef<HTMLDivElement>()
  }

  componentDidMount() {
    if (this.refEditor.current) {
      const editor = ace.edit(this.refEditor.current)
      editor.setTheme('ace/theme/monokai')
      this.aceEditor = editor
    }
  }

  onCursorChange(
    callback: (cursor: {
      row: number
      col: number
      selectedColCount: number
    }) => void
  ) {
    this.aceEditor &&
      this.aceEditor.selection.on(
        'changeCursor',
        (...args: Array<ace.Ace.Selection>) => {
          const range = args[1].getRange()
          callback({
            row: range.start.row + 1,
            col: range.start.column + 1,
            selectedColCount: range.end.column - range.start.column
          })
        }
      )
  }

  resize() {
    this.aceEditor && this.aceEditor.resize()
  }

  setValue(val: string, cursorPos?: number) {
    this.aceEditor && this.aceEditor.setValue(val, cursorPos)
  }

  focus() {
    this.aceEditor && this.aceEditor.focus()
  }

  onValueChange(callback: (delta: ace.Ace.Delta) => void) {
    if (!this.aceEditor) return
    this.aceEditor.on('change', callback)
  }

  onInput(callback: () => void) {
    if (!this.aceEditor) return
    this.aceEditor.on('input', callback)
  }

  setMode(fileName: string) {
    this.aceEditor &&
      this.aceEditor.session.setMode(getModeForPath(fileName).mode)
  }

  getValue() {
    if (this.aceEditor) {
      return this.aceEditor.getValue()
    }
    return ''
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.refEditor}></div>
    )
  }
}
