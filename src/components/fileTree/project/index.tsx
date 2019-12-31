import React from 'react'
import { FileTreeProjectProps } from '../interface'
import Folder from '../folder'
import './index.less'

export default function FileTreeProject({
  project,
  onFileClick
}: FileTreeProjectProps) {
  return (
    <div className="webcode-filetree-project">
      <Folder
        id={project.id}
        relative={project.relative}
        name={project.name}
        files={project.children}
        onFileClick={onFileClick}
        initalOpen
        forbiddenFold
        initialType="project"
      />
    </div>
  )
}
