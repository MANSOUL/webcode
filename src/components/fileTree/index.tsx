import './index.less'
import React from 'react'
import FileTreeProject from './project'
import { FileTreeFile } from './interface'

export interface Props {
  data?: FileTreeFile | null
  onFileClick?: (id: string, relative: string, type: string) => void
}

export default function FileTree({ data = null, onFileClick }: Props) {
  return (
    <div className="webcode-filetree">
      {data ? (
        <FileTreeProject project={data} onFileClick={onFileClick} />
      ) : null}
    </div>
  )
}
