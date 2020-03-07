import React from 'react'
import Tab, {
  TabButton,
  TabItem,
  TabSwicher,
  TabContainer
} from '@src/components/tab'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@src/store'
import MyEditor from '../editor'
import { getFileIndex, getFileById } from '@src/store/files/util'
import {
  changeCurrentFile,
  fileCloseFile,
  actionFileSaveFile
} from '@src/store/files/actions'
import { FileContent } from '@src/store/files'
import Scroller from '@src/components/ui/scroller'
import { createStyles } from '@src/theme'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from '@src/components/ui/dialog'
import Button from '@src/components/ui/button'
import * as monaco from 'monaco-editor'
import { convertTheme } from '@src/theme/editor'
import useTheme from '@src/theme/useTheme'
import FileSocket from '../editor/fileSocket'
import { getProject } from '@src/config/project'

const useStyles = createStyles(theme => ({
  tabSwitcher: {
    backgroundColor: theme.colors['tab.inactiveBackground']
  },
  tabContainer: {
    backgroundColor: theme.colors['editor.background']
  },
  tabButton: {
    '&::after': {
      backgroundColor: theme.colors['tab.activeBorder']
    }
  }
}))

export default function MyTab() {
  const [tab, setTab] = React.useState(0)
  const refScroller = React.useRef<Scroller | null>(null)
  const files = useSelector((store: AppStore) => store.files)
  const editor = useSelector((store: AppStore) => store.editor)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [dialog, setDialog] = React.useState({
    open: false,
    title: '',
    content: ''
  })
  const refCurrentFile = React.useRef<FileContent | null>(null)
  const theme = useTheme()

  React.useEffect(() => {
    //@ts-ignore
    monaco.editor.defineTheme('webcodeTheme', convertTheme(theme.theme))
    monaco.editor.setTheme('webcodeTheme')
  }, [theme.theme])

  React.useEffect(() => {
    refScroller.current && refScroller.current.resize()
  }, [editor.resizeCount])

  // change id by file store id
  const nextTab = getFileIndex(files.fileContents, files.currentFileId)
  if (tab !== nextTab) {
    setTab(nextTab)
  }

  const handleTabChange = (index: number) => {
    dispatch(changeCurrentFile(files.fileContents[index].id))
  }

  const handleTabClose = (item: FileContent) => () => {
    const file = getFileById(files.fileContents, item.id)
    if (!file) return
    refCurrentFile.current = file
    if (file.modified) {
      setDialog({
        title: `是否要保存对 ${'index.ts'} 的更改?`,
        content: '如果不保存，更改将丢失。',
        open: true
      })
    } else {
      dispatch(fileCloseFile(item.id))
    }
  }

  const handleUnsaveFile = () => {
    refCurrentFile.current && dispatch(fileCloseFile(refCurrentFile.current.id))
    setDialog({
      ...dialog,
      open: false
    })
  }

  const handleCloseDialog = () => {
    setDialog({
      ...dialog,
      open: false
    })
  }

  const handleSaveFile = () => {
    if (!refCurrentFile.current) return
    const { id, relative } = refCurrentFile.current
    FileSocket.send(relative, getProject(), 'save')
    dispatch(actionFileSaveFile(id))
    dispatch(fileCloseFile(id))
    setDialog({
      ...dialog,
      open: false
    })
  }

  return (
    <Tab onTabChange={handleTabChange}>
      <TabSwicher className={classes.tabSwitcher}>
        <Scroller ref={refScroller} activeIndex={tab}>
          {files.fileContents.map((item, index: number) => (
            <TabButton
              key={item.id}
              fileName={item.fileName}
              modified={item.modified}
              filePath={item.relative}
              active={tab === index}
              onClose={handleTabClose(item)}
              className={classes.tabButton}
            />
          ))}
        </Scroller>
      </TabSwicher>
      <TabContainer className={classes.tabContainer}>
        {files.fileContents.map((item, index: number) => (
          <TabItem key={item.id} tab={index} activeTab={tab}>
            <MyEditor fileKey={item.id} />
          </TabItem>
        ))}
      </TabContainer>
      <Dialog open={dialog.open} transparent>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>{dialog.content}</DialogContent>
        <DialogActions>
          <Button type="danger" size="small" onClick={handleUnsaveFile}>
            不保存
          </Button>
          <Button size="small" onClick={handleCloseDialog}>
            取消
          </Button>
          <Button type="primary" size="small" onClick={handleSaveFile}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Tab>
  )
}
