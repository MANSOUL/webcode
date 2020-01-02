import React from 'react'
import Editor from '@src/components/monaco'
import { AppStore } from '@src/store'
import { useSelector, useDispatch } from 'react-redux'
import { getFileById } from '@src/store/files/util'
import { createEditorSelectionAction } from '@src/store/editor/actions'
import { fileModifyFile, fileSaveFile } from '@src/store/files/actions'

export interface Props {
  fileKey: string
}

export default function MyEditor({ fileKey }: Props) {
  const refEditor = React.useRef<Editor | null>(null)
  const files = useSelector((store: AppStore) => store.files)
  const editor = useSelector((store: AppStore) => store.editor)
  const dispatch = useDispatch()
  const { loading, error, errorMessage, fileContents } = files
  const file = getFileById(fileContents, fileKey)

  React.useEffect(() => {
    if (refEditor.current && file) {
      refEditor.current.focus()
      bindEvent()
    }
  }, [])

  // resize editor
  React.useEffect(() => {
    refEditor.current && refEditor.current.resize()
  }, [editor.resizeCount, files.currentFileId])

  const bindEvent = () => {
    if (refEditor.current) {
      refEditor.current.onCursorChange(cursor =>
        dispatch(createEditorSelectionAction(cursor))
      )

      // refEditor.current.onValueChange((dealt: Ace.Delta) => {
      //   // dealt 可以实现更加细腻度的控制，可用于实时在线编程直播
      //   console.log(dealt)
      //   console.log(refEditor.current?.getValue())
      //   // TODO 触发细腻度更高的编辑事件
      //   dispatch(fileModifyFile(fileKey, refEditor.current?.getValue() || ''))
      // })

      refEditor.current.onInput(() => {
        const file = getFileById(files.fileContents, fileKey)
        if (file && file.content !== refEditor.current?.getValue()) {
          dispatch(fileModifyFile(fileKey, refEditor.current?.getValue() || ''))
        }
      })

      refEditor.current.onSave(() => {
        console.log('file save')
        dispatch(fileSaveFile(fileKey))
      })
    }
  }

  return (
    <Editor
      ref={refEditor}
      fileName={file?.relative || ''}
      fileContent={file?.content || ''}
    />
  )
}
