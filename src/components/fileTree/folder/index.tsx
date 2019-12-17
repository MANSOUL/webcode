import './index.less'
import React from 'react'
import { FileTreeFolderProps, FileTreeFile } from '../interface'
import clsx from 'clsx'
import File from '../file'

export default function Folder({
  id,
  relative,
  files,
  name,
  initalOpen = true,
  level = 1,
  onFileClick
}: FileTreeFolderProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const type = open ? 'folderOpen' : 'folder'

  const handleFolderClick = (id: string, relative: string, type: string) => {
    setOpen(!open)
    onFileClick && onFileClick(id, relative, type)
  }

  return (
    <div className="webcode-filetree-folder">
      <File
        id={id}
        relative={relative}
        name={name}
        type={type}
        level={level}
        onClick={handleFolderClick}
      />
      <div
        className={clsx('webcode-filetree-folder__sub', {
          'webcode-filetree-folder__sub--open': open
        })}
      >
        {files.map((file: FileTreeFile) =>
          file.type === 'file' ? (
            <File
              key={file.id}
              id={file.id}
              relative={file.relative}
              name={file.name}
              level={level + 1}
              onClick={onFileClick}
            />
          ) : (
            <Folder
              id={file.id}
              relative={file.relative}
              key={file.id}
              name={file.name}
              files={file.children}
              level={level + 1}
              onFileClick={onFileClick}
            />
          )
        )}
      </div>
    </div>
  )
}
