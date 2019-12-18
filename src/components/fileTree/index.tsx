import './index.less'
import React from 'react'
import FileTreeProject from './project'
import { FileTreeFile } from './interface'

export interface Props {
  data?: FileTreeFile | null
  onFileClick?: (id: string, relative: string, type: string) => void
  activeFileId: string
}

export default function FileTree({
  data = null,
  onFileClick,
  activeFileId
}: Props) {
  return (
    <div className="webcode-filetree">
      {data ? (
        <FileTreeProject
          project={data}
          onFileClick={onFileClick}
          activeFileId={activeFileId}
        />
      ) : null}
    </div>
  )
}
