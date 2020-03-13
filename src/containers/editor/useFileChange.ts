import React from 'react'
import { getFileById } from '@src/store/files/util'
import { FileContent } from '@src/store/files'
import useFiles from './useFiles'

export default function useFileChange(id: string) {
  const files = useFiles()
  const file = getFileById(files.fileContents, id)
  const [refFile, setRefFile] = React.useState<FileContent | undefined>(file)
  React.useEffect(() => {
    setRefFile(file)
  }, [file?.loading])
  return refFile
}
