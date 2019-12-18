import './index.less'
import React from 'react'
import { FileTreeFolderProps } from '../interface'
import clsx from 'clsx'
import File from '../file'
import RecursionFile from '../recursionFile'

export default function Folder({
  id,
  relative,
  files,
  name,
  initalOpen = true,
  level = 1,
  onFileClick,
  activeFileId
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
        <RecursionFile
          files={files}
          onFileClick={onFileClick}
          level={level}
          activeFileId={activeFileId}
        />
      </div>
    </div>
  )
}
