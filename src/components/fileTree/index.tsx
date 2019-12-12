import './index.less'
import React from 'react'
import data from './data'
import FileTreeProject from './project'

export default function FileTree() {
  return (
    <div className="webcode-filetree">
      <FileTreeProject project={data} />
    </div>
  )
}
