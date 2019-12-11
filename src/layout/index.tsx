import React from 'react'
import Editor from '@src/components/editor'
import FileTree from '@src/components/fileTree'
import './index.less'
import VerticalResizer from './verticalResizer'

export default function Layout() {
  const refTreeElementWidth = React.useRef(0)
  const refTreeElement = React.useRef<HTMLDivElement | null>(null)
  const refEditor = React.useRef(null)

  React.useEffect(() => {
    console.log(refEditor)
    if (refTreeElement.current) {
      refTreeElementWidth.current = refTreeElement.current.clientWidth
    }
  }, [])

  const handleResizerChange = (offset: number) => {
    if (refTreeElement.current) {
      const nextWidth = refTreeElementWidth.current + offset
      refTreeElement.current.style.width = `${nextWidth}px`
      refTreeElementWidth.current = nextWidth
    }
  }

  return (
    <div className="webcode-layout">
      <div className="webcode-layout__toolbar"></div>
      <div className="webcode-layout__container">
        <div className="webcode-layout__extensions"></div>
        <div className="webcode-layout__filetree" ref={refTreeElement}>
          <FileTree />
        </div>
        <VerticalResizer onChange={handleResizerChange} />
        <div className="webcode-layout__content">
          <div className="webcode-layout__code">
            <Editor ref={refEditor} />
          </div>
          <div className="webcode-layout__terminal"></div>
        </div>
      </div>
      <div className="webcode-layout__footbar"></div>
    </div>
  )
}
