import './index.less'
import React from 'react'
import { FileTreeFolderProps, FileTreeFile } from '../interface'
import clsx from 'clsx'
import File from '../file'

export default function Folder({
  files,
  name,
  initalOpen = true,
  level = 1
}: FileTreeFolderProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const type = open ? 'folderOpen' : 'folder'

  const handleFolderClick = () => {
    setOpen(!open)
  }

  return (
    <div className="webcode-filetree-folder">
      <File name={name} type={type} level={level} onClick={handleFolderClick} />
      <div
        className={clsx('webcode-filetree-folder__sub', {
          'webcode-filetree-folder__sub--open': open
        })}
      >
        {files.map((file: FileTreeFile) =>
          file.type === 'file' ? (
            <File key={file.id} name={file.name} level={level + 1} />
          ) : (
            <Folder
              key={file.id}
              name={file.name}
              files={file.children}
              level={level + 1}
            />
          )
        )}
      </div>
    </div>
  )
}
