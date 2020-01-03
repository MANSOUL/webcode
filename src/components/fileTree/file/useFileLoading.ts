import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '@src/store'
import { getFileById } from '@src/store/files/util'

export default function useFileLoading(id: string) {
  const files = useSelector((store: AppStore) => store.files)
  const file = getFileById(files.fileContents, id)
  return file?.loading || false
}
