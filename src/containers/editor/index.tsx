import React from 'react'
import Editor from '@src/components/editor'
import { AppStore } from '@src/store'
import { useSelector, useDispatch } from 'react-redux'
import { getFileById } from '@src/store/files/util'
import { createEditorSelectionAction } from '@src/store/editor/actions'
import { Ace } from 'ace-builds'
import { fileModifyFile } from '@src/store/files/actions'

export interface Props {
  fileKey: string
}

export default function MyEditor({ fileKey }: Props) {
  const refEditor = React.useRef<Editor | null>(null)
  const files = useSelector((store: AppStore) => store.files)
  const editor = useSelector((store: AppStore) => store.editor)
  const dispatch = useDispatch()

  React.useEffect(() => {
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
    }

    projectChange()
  }, [])

  // resize editor
  React.useEffect(() => {
    refEditor.current && refEditor.current.resize()
  }, [editor.resizeCount])

  const projectChange = () => {
    const { loading, error, errorMessage, fileContents } = files
    const file = getFileById(fileContents, fileKey)
    if (refEditor.current && file) {
      console.log(file.fileName)
      refEditor.current.setMode(file.fileName)
      refEditor.current.setValue(file.content, 1)
      refEditor.current.focus()
    }
  }

  return <Editor ref={refEditor} />
}
