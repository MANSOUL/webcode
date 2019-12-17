import './index.less'
import React from 'react'
import File from '../file'
import Folder from '../folder'
import { FileTreeProjectProps, FileTreeFile } from '../interface'

export default function FileTreeProject({
  project,
  onFileClick
}: FileTreeProjectProps) {
  return (
    <div className="webcode-filetree-project">
      <div className="webcode-filetree-project__info">
        <span className="webcode-filetree-project__name">{project.name}</span>
      </div>
      {project.children.map((file: FileTreeFile) =>
        file.type === 'file' ? (
          <File
            key={file.id}
            id={file.id}
            relative={file.relative}
            name={file.name}
            onClick={onFileClick}
          />
        ) : (
          <Folder
            id={file.id}
            relative={file.relative}
            key={file.id}
            name={file.name}
            files={file.children}
            onFileClick={onFileClick}
          />
        )
      )}
    </div>
  )
}
