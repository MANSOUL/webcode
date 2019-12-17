import React from 'react'
import Editor from '@src/components/editor'
import { AppStore } from '@src/store'
import { useSelector } from 'react-redux'

export interface Props {
  rref: React.MutableRefObject<Editor | null>
}

export default function MyEditor({ rref }: Props) {
  const refEditor = React.useRef<Editor | null>(null)
  const project = useSelector((store: AppStore) => store.project)

  React.useEffect(() => {
    projectChange()
  }, [project.currentFile])

  React.useEffect(() => {
    rref.current = refEditor.current
    refEditor.current && refEditor.current.onValueChange()
  }, [refEditor.current])

  const projectChange = () => {
    const { loading, error, errorMessage, fileContents, currentFile } = project
    console.log(fileContents, currentFile)
    if (refEditor.current && currentFile && fileContents[currentFile]) {
      refEditor.current.setValue(fileContents[currentFile])
      refEditor.current.focus()
    }
  }

  return <Editor ref={refEditor} />
}
