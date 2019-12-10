import React from 'react'
import ace from 'ace-builds'

ace.config.set('basePath', 'http://ajaxorg.github.io/ace-builds/src-noconflict')
ace.config.set('fontSize', 15)

export default function Editor() {
  const refEditor = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    if (refEditor.current) {
      const editor = ace.edit(refEditor.current)
      editor.setTheme('ace/theme/monokai')
      editor.session.setMode('ace/mode/javascript')
    }
  }, [])
  return <div style={{ width: '100%', height: '100%' }} ref={refEditor}></div>
}
