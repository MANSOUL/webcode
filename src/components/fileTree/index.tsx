import './index.less'
import React from 'react'
import FileTreeProject from './project'
import { FileTreeFile } from './interface'

export interface Props {
  data?: FileTreeFile | null
}

export default function FileTree({ data = null }: Props) {
  return (
    <div className="webcode-filetree">
      {data ? <FileTreeProject project={data} /> : null}
    </div>
  )
}
