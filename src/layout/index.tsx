import './index.less'
import React from 'react'
import VerticalResizer from './verticalResizer'
import HorizontalResizer from './horizontalResizer'
import ActivityBar, { ActivityBarItem } from '@src/containers/activityBar'
import EditorPosition from '@src/components/editorPosition'
import FootbarTerminal from '@src/components/footbarTerminal'
import XTerminal from '@src/components/terminal'
import MyFileTree from '@src/containers/fileTree'
import MyTab from '@src/containers/tab'
import { useDispatch, useSelector } from 'react-redux'
import { createEditorResizeAction } from '@src/store/editor/actions'
import { AppStore } from '@src/store'
import { isEqual, debounce } from 'lodash'
import { createStyles } from '@src/theme'
import clsx from 'clsx'
import { getUnsavedFileCount } from '@src/store/files/util'
import iconCCFile from '@src/aseets/svg/cc-file.svg'

const INITIAL_TERMINAL_HEIGHT = 300

const useStyles = createStyles(theme => ({
  sideBar: {
    backgroundColor: theme.colors['sideBar.background']
  },
  activityBar: {
    backgroundColor: theme.colors['activityBar.background']
  },
  statusBar: {
    backgroundColor: theme.colors['statusBar.background'],
    color: theme.colors['statusBar.foreground'],
    fill: theme.colors['statusBar.foreground']
  },
  statusBarItem: {
    '&:hover': {
      backgroundColor: theme.colors['statusBarItem.hoverBackground']
    }
  }
}))

export default function Layout() {
  const refTreeElementWidth = React.useRef(0)
  const refTreeElementPrevWidth = React.useRef(0)
  const refTreeElement = React.useRef<HTMLDivElement | null>(null)
  const refTerminalElementHeight = React.useRef(INITIAL_TERMINAL_HEIGHT)
  const refTerminalElement = React.useRef<HTMLDivElement | null>(null)
  const [editorSlection, setEditorSelection] = React.useState({
    row: 0,
    col: 0,
    selectedColCount: 0
  })
  const [terminalOpen, setTerminalOpen] = React.useState(false)
  const [activityBar, setActivityBar] = React.useState(0)

  const dispatch = useDispatch()
  const editor = useSelector((store: AppStore) => store.editor)
  const files = useSelector((store: AppStore) => store.files)
  const classes = useStyles()
  const resizeDebounced = React.useRef(
    debounce(() => dispatch(createEditorResizeAction()))
  )

  if (!isEqual(editorSlection, editor.editorSlection)) {
    setEditorSelection(editor.editorSlection)
  }

  React.useEffect(() => {
    if (refTreeElement.current) {
      refTreeElementPrevWidth.current = refTreeElementWidth.current =
        refTreeElement.current.clientWidth
    }
    if (refTerminalElement.current) {
      refTerminalElementHeight.current = refTerminalElement.current.clientHeight
    }

    window.addEventListener('resize', resizeEditor, false)
    return () => window.removeEventListener('resize', resizeEditor, false)
  }, [])

  const resizeEditor = () => {
    resizeDebounced.current()
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

  const handleFileActivityClick = () => {
    const resizeWidth =
      refTreeElementWidth.current === 0
        ? refTreeElementPrevWidth.current
        : -refTreeElementWidth.current
    refTreeElementPrevWidth.current = Math.abs(resizeWidth)
    setActivityBar(resizeWidth > 0 ? 0 : -1)
    handleResizerChange(resizeWidth)
  }

  return (
    <div className="webcode-layout">
      {/* <div className="webcode-layout__toolbar"></div> */}
      <div className="webcode-layout__container">
        <div
          className={clsx('webcode-layout__activity-bar', classes.activityBar)}
        >
          <ActivityBar>
            <ActivityBarItem
              iconFont={iconCCFile}
              active={activityBar === 0}
              badge={getUnsavedFileCount(files.fileContents)}
              onClick={handleFileActivityClick}
            />
          </ActivityBar>
        </div>
        <div
          className={clsx('webcode-layout__sidebar', classes.sideBar)}
          ref={refTreeElement}
        >
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
      <div className={clsx('webcode-layout__statusbar', classes.statusBar)}>
        <div>
          <FootbarTerminal
            onClick={handleToggleTerminal}
            className={classes.statusBarItem}
          />
        </div>
        <div>
          <EditorPosition
            row={editorSlection.row}
            col={editorSlection.col}
            selected={editorSlection.selectedColCount}
            className={classes.statusBarItem}
          />
        </div>
      </div>
    </div>
  )
}
