import './index.less'
import React from 'react'
import VerticalResizer from './verticalResizer'
import HorizontalResizer from './horizontalResizer'
import Extension from '@src/components/extension'
import EditorPosition from '@src/components/editorPosition'
import FootbarTerminal from '@src/components/footbarTerminal'
import XTerminal from '@src/components/terminal'
import MyFileTree from '@src/containers/fileTree'
import MyTab from '@src/containers/tab'
import { useDispatch, useSelector } from 'react-redux'
import { createEditorResizeAction } from '@src/store/editor/actions'
import { AppStore } from '@src/store'
import { isEqual } from 'lodash'

const INITIAL_TERMINAL_HEIGHT = 300

export default function Layout() {
  const refTreeElementWidth = React.useRef(0)
  const refTreeElement = React.useRef<HTMLDivElement | null>(null)
  const refTerminalElementHeight = React.useRef(INITIAL_TERMINAL_HEIGHT)
  const refTerminalElement = React.useRef<HTMLDivElement | null>(null)
  const [editorSlection, setEditorSelection] = React.useState({
    row: 0,
    col: 0,
    selectedColCount: 0
  })
  const [terminalOpen, setTerminalOpen] = React.useState(false)
  const dispatch = useDispatch()
  const editor = useSelector((store: AppStore) => store.editor)

  if (!isEqual(editorSlection, editor.editorSlection)) {
    setEditorSelection(editor.editorSlection)
  }

  React.useEffect(() => {
    if (refTreeElement.current) {
      refTreeElementWidth.current = refTreeElement.current.clientWidth
    }
    if (refTerminalElement.current) {
      refTerminalElementHeight.current = refTerminalElement.current.clientHeight
    }
  }, [])

  const resizeEditor = () => {
    dispatch(createEditorResizeAction())
  }

  const handleResizerChange = (offset: number) => {
    if (refTreeElement.current) {
      const nextWidth = refTreeElementWidth.current + offset
      refTreeElement.current.style.width = `${nextWidth}px`
      refTreeElementWidth.current = nextWidth
      resizeEditor()
    }
  }

  const handleTerminalReisizerChange = (offset: number) => {
    if (refTerminalElement.current) {
      const nextHeight = refTerminalElementHeight.current - offset
      if (nextHeight < 1) {
        handleToggleTerminal()
        return
      }
      refTerminalElement.current.style.height = `${nextHeight}px`
      refTerminalElementHeight.current = nextHeight
      resizeEditor()
    }
  }

  const handleToggleTerminal = () => {
    const nextTerminalOpen = !terminalOpen
    if (!nextTerminalOpen) {
      refTerminalElementHeight.current = INITIAL_TERMINAL_HEIGHT
    }
    setTerminalOpen(nextTerminalOpen)
    resizeEditor()
  }

  return (
    <div className="webcode-layout">
      {/* <div className="webcode-layout__toolbar"></div> */}
      <div className="webcode-layout__container">
        <div className="webcode-layout__extensions">
          <Extension />
        </div>
        <div className="webcode-layout__filetree" ref={refTreeElement}>
          <MyFileTree />
        </div>
        <VerticalResizer onChange={handleResizerChange} />
        <div className="webcode-layout__content">
          <div className="webcode-layout__tab">
            <MyTab />
          </div>
          {/* <div className="webcode-layout__code">
            <MyEditor rref={refEditor} />
          </div> */}
          {terminalOpen ? (
            <HorizontalResizer onChange={handleTerminalReisizerChange} />
          ) : null}
          {terminalOpen ? (
            <div
              style={{ height: INITIAL_TERMINAL_HEIGHT }}
              ref={refTerminalElement}
              className="webcode-layout__terminal"
            >
              <XTerminal />
            </div>
          ) : null}
        </div>
      </div>
      <div className="webcode-layout__footbar">
        <div>
          <FootbarTerminal onClick={handleToggleTerminal} />
        </div>
        <div>
          <EditorPosition
            row={editorSlection.row}
            col={editorSlection.col}
            selected={editorSlection.selectedColCount}
          />
        </div>
      </div>
    </div>
  )
}
