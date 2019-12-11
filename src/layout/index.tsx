import React from 'react'
import Editor from '@src/components/editor'
import FileTree from '@src/components/fileTree'
import './index.less'
import VerticalResizer from './verticalResizer'
import HorizontalResizer from './horizontalResizer'

export default function Layout() {
  const refTreeElementWidth = React.useRef(0)
  const refTreeElement = React.useRef<HTMLDivElement | null>(null)
  const refTerminalElementHeight = React.useRef(0)
  const refTerminalElement = React.useRef<HTMLDivElement | null>(null)
  const refEditor = React.useRef(null)

  React.useEffect(() => {
    if (refTreeElement.current) {
      refTreeElementWidth.current = refTreeElement.current.clientWidth
    }
    if (refTerminalElement.current) {
      refTerminalElementHeight.current = refTerminalElement.current.clientHeight
    }
  }, [])

  const handleResizerChange = (offset: number) => {
    if (refTreeElement.current) {
      const nextWidth = refTreeElementWidth.current + offset
      refTreeElement.current.style.width = `${nextWidth}px`
      refTreeElementWidth.current = nextWidth
    }
  }

  const handleTerminalReisizerChange = (offset: number) => {
    if (refTerminalElement.current) {
      const nextHeight = refTerminalElementHeight.current - offset
      refTerminalElement.current.style.height = `${nextHeight}px`
      refTerminalElementHeight.current = nextHeight
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
          <HorizontalResizer onChange={handleTerminalReisizerChange} />
          <div
            ref={refTerminalElement}
            className="webcode-layout__terminal"
          ></div>
        </div>
      </div>
      <div className="webcode-layout__footbar"></div>
    </div>
  )
}
