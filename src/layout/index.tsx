import React from 'react'
import Editor from '@src/components/editor'
import FileTree from '@src/components/fileTree'
import './index.less'

export default function Layout() {
  const refEditor = React.useRef(null)

  React.useEffect(() => {
    console.log(refEditor)
  }, [])

  return (
    <div className="webcode-layout">
      <div className="webcode-layout__toolbar"></div>
      <div className="webcode-layout__container">
        <div className="webcode-layout__extensions"></div>
        <div className="webcode-layout__filetree">
          <FileTree />
        </div>
        <div className="webcode-layout__content">
          <Editor ref={refEditor} />
        </div>
      </div>
      <div className="webcode-layout__footbar"></div>
    </div>
  )
}
