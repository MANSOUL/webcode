import React, { useRef } from 'react'
import Editor from '@src/components/monaco'
import { AppStore } from '@src/store'
import { useSelector, useDispatch } from 'react-redux'
import { createEditorSelectionAction } from '@src/store/editor/actions'
import {
  fileModifyFile,
  actionFileSaveFile,
  fileCloseFile
} from '@src/store/files/actions'
import { Line } from 'rc-progress'
import './index.less'
import useFileLoading from '@src/hooks/useFileLoading'
import FileContainer from '@src/components/fileContainer'
import useProgress from './useProgress'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from '@src/components/ui/dialog'
import Button from '@src/components/ui/button'
import { getBase } from '@src/utils/file'
import useFileChange from './useFileChange'
import useFiles from './useFiles'
import fileSaver from './fileSaver'

export interface Props {
  fileKey: string
  status: 'open' | 'close'
}

export default function MyEditor({ fileKey, status }: Props) {
  const refEditor = React.useRef<Editor | null>(null)
  const editor = useSelector((store: AppStore) => store.editor)
  const dispatch = useDispatch()
  const refFile = useFileChange(fileKey)
  const files = useFiles()
  const progress = useProgress()
  const fileLoading = useFileLoading(fileKey)
  const [dialog, setDialog] = React.useState({
    open: false,
    title: '',
    content: ''
  })
  React.useEffect(() => {
    if (refEditor.current && refFile) {
      refEditor.current.focus()
      bindEvent()
    }
  }, [])

  React.useEffect(() => {
    if (refEditor.current) {
      refEditor.current.setMode(refFile?.relative || '', refFile?.content || '')
    }
  }, [refFile?.loading])

  // 文件状态变化
  React.useEffect(() => {
    if (status === 'close') {
      handleClose()
    }
  }, [status])

  // resize editor
  React.useEffect(() => {
    refEditor.current && refEditor.current.resize()
  }, [editor.resizeCount, files.currentFileId])

  const bindEvent = () => {
    if (refEditor.current) {
      refEditor.current.onCursorChange(cursor =>
        dispatch(createEditorSelectionAction(cursor))
      )
      refEditor.current.onInput(e => {
        if (
          refFile &&
          refFile.content !== refEditor.current?.getValue() &&
          !e.isFlush // 手动输入时 isFlush 为false
        ) {
          dispatch(fileModifyFile(fileKey, refEditor.current?.getValue() || ''))
        }
      })
      refEditor.current.onSave(() => sendSave(
        refEditor.current?.getValue()
      ))
    }
  }

  const sendSave = async (content: string | undefined, cb?: () => void) => {
    if (!refFile || !content) return
    try {
      const res = await fileSaver(refFile.relative, content)
      if (res.status === 200) {
        dispatch(actionFileSaveFile(fileKey))
        cb && cb()
      } else {
        setDialog({
          title: `保存失败，请重试`,
          content: '',
          open: true
        })
      }
    } catch (error) {
      console.log(error)
      setDialog({
        title: `网络异常，请稍后重试`,
        content: '',
        open: true
      })
    }
  }

  const handleClose = () => {
    if (!refFile) return
    setDialog({
      title: `是否要保存对 ${getBase(refFile.relative)} 的更改?`,
      content: '如果不保存，更改将丢失。',
      open: true
    })
  }

  const handleUnsaveFile = () => {
    refFile && dispatch(fileCloseFile(refFile.id))
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
    sendSave(refEditor.current?.getValue(), () => {
      dispatch(fileCloseFile(fileKey))
      setDialog({
        ...dialog,
        open: false
      })
    })
  }

  return (
    <div className="webcode-editor-container">
      {refFile?.type !== 'text' ? (
        <FileContainer
          type={refFile?.type || ''}
          url={refFile?.content || ''}
        />
      ) : (
        <Editor
          ref={refEditor}
          fileName={refFile?.relative || ''}
          fileContent={refFile?.content || ''}
        />
      )}
      {fileLoading ? (
        <div className="webcode-editor-container__loading-box">
          <div className="webcode-editor-container__loading">
            <Line
              percent={progress}
              strokeWidth={1}
              trailWidth={1}
              trailColor="#D3D3D3"
              strokeColor="#fa98ac"
            />
          </div>
        </div>
      ) : null}
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
    </div>
  )
}
