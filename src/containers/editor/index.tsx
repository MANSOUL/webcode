import React from 'react'
import Editor from '@src/components/editor'
import { AppStore } from '@src/store'
import { useSelector } from 'react-redux'
import { getFileById } from '@src/store/files/util'

export interface Props {
  rref?: React.MutableRefObject<Editor | null>
  fileKey: string
}

export default function MyEditor({ rref, fileKey }: Props) {
  const refEditor = React.useRef<Editor | null>(null)
  const files = useSelector((store: AppStore) => store.files)

  React.useEffect(() => {
    projectChange()
  }, [files.fileContents])

  React.useEffect(() => {
    if (rref) {
      rref.current = refEditor.current
    }
    refEditor.current && refEditor.current.onValueChange()
  }, [refEditor.current])

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
