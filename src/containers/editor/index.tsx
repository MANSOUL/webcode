import React from 'react'
import Editor from '@src/components/editor'
import { AppStore } from '@src/store'
import { useSelector, useDispatch } from 'react-redux'
import { getFileById } from '@src/store/files/util'
import { createEditorSelectionAction } from '@src/store/editor/actions'

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
    }
  }, [])

  // 取出编辑器对应的文件内容
  React.useEffect(() => {
    projectChange()
  }, [files.fileContents])

  // resize editor
  React.useEffect(() => {
    refEditor.current && refEditor.current.resize()
  }, [editor.resizeCount])

  const projectChange = () => {
    const { loading, error, errorMessage, fileContents } = files
    const file = getFileById(fileContents, fileKey)
    if (refEditor.current && file) {
      refEditor.current.setValue(file.content, 1)
      refEditor.current.focus()
    }
  }

  return <Editor ref={refEditor} />
}
