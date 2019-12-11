import './index.less'
import React from 'react'
import clsx from 'clsx'
import { FileTreeFile } from './interface'
import data from './data'
import File from './file'
import Folder from './folder'

export default function FileTree() {
  return (
    <div className="webcode-filetree">
      {data.children.map((file: FileTreeFile) =>
        file.type === 'file' ? (
          <File key={file.id} name={file.name} />
        ) : (
          <Folder key={file.id} name={file.name} files={file.children} />
        )
      )}
    </div>
  )
}
