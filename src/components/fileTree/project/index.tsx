import './index.less'
import React from 'react'
import { FileTreeProjectProps } from '../interface'
import RecursionFile from '../recursionFile'

export default function FileTreeProject({
  project,
  onFileClick,
  activeFileId
}: FileTreeProjectProps) {
  return (
    <div className="webcode-filetree-project">
      <div className="webcode-filetree-project__info">
        <span className="webcode-filetree-project__name">{project.name}</span>
      </div>
      <RecursionFile
        files={project.children}
        onFileClick={onFileClick}
        level={0}
        activeFileId={activeFileId}
      />
    </div>
  )
}
