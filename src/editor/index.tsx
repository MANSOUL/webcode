import React from 'react'
import ace from 'ace-builds'

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
      editor.session.setMode('ace/mode/javascript')
      this.aceEditor = editor
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.refEditor}></div>
    )
  }
}
