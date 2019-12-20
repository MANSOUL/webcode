import React from 'react'
import { RecursionFileProps, FileTreeFile } from '../interface'
import File from '../file'
import Folder from '../folder'
import { useSelector } from 'react-redux'
import { AppStore } from '@src/store'

export default function RecursionFile({
  files,
  level,
  onFileClick
}: RecursionFileProps) {
  const storeFile = useSelector((store: AppStore) => store.files)

  return (
    <>
      {files.map((file: FileTreeFile) =>
        file.type === 'file' ? (
          <File
            key={file.id}
            id={file.id}
            relative={file.relative}
            name={file.name}
            level={level + 1}
            onClick={onFileClick}
            active={file.id === storeFile.currentFileId}
          />
        ) : (
          <Folder
            key={file.id}
            id={file.id}
            relative={file.relative}
            name={file.name}
            files={file.children}
            level={level + 1}
            onFileClick={onFileClick}
          />
        )
      )}
    </>
  )
}
