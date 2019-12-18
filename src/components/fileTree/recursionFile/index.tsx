import React from 'react'
import { RecursionFileProps, FileTreeFile } from '../interface'
import File from '../file'
import Folder from '../folder'

export default function RecursionFile({
  files,
  level,
  onFileClick,
  activeFileId
}: RecursionFileProps) {
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
            active={file.id === activeFileId}
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
            activeFileId={activeFileId}
          />
        )
      )}
    </>
  )
}
