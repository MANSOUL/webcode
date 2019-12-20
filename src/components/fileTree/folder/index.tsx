import './index.less'
import React from 'react'
import { FileTreeFolderProps } from '../interface'
import clsx from 'clsx'
import File, { NewFile } from '../file'
import RecursionFile from '../recursionFile'
import { useDispatch } from 'react-redux'
import {
  projectCreateFile,
  projectCreateFolder
} from '@src/store/project/actions'

export default function Folder({
  id,
  relative,
  files,
  name,
  initalOpen = true,
  level = 1,
  onFileClick
}: FileTreeFolderProps) {
  const [newType, setNewType] = React.useState<'file' | 'folder'>('file')
  const [newFile, setNewFileOpen] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const type = open ? 'folderOpen' : 'folder'
  const dispatch = useDispatch()

  const handleFolderClick = (id: string, relative: string, type: string) => {
    setOpen(!open)
    onFileClick && onFileClick(id, relative, type)
  }

  const handleCreateFile = () => {
    setNewType('file')
    setOpen(true)
    setNewFileOpen(true)
  }

  const handleCreateFolder = () => {
    setNewType('folder')
    setOpen(true)
    setNewFileOpen(true)
  }

  const handleCreateFileDone = (name: string) => {
    if (newType === 'file') {
      dispatch(projectCreateFile(relative, name))
    } else {
      dispatch(projectCreateFolder(relative, name))
    }
    setNewFileOpen(false)
  }

  const handleCreateFileCancel = () => setNewFileOpen(false)

  return (
    <div className="webcode-filetree-folder">
      <File
        id={id}
        relative={relative}
        name={name}
        type={type}
        level={level}
        onClick={handleFolderClick}
        onCreateFile={handleCreateFile}
        onCreateFolder={handleCreateFolder}
      />
      <div
        className={clsx('webcode-filetree-folder__sub', {
          'webcode-filetree-folder__sub--open': open
        })}
      >
        {newFile ? (
          <NewFile
            type={newType}
            level={level + 1}
            onDone={handleCreateFileDone}
            onCancel={handleCreateFileCancel}
          />
        ) : null}
        <RecursionFile files={files} onFileClick={onFileClick} level={level} />
      </div>
    </div>
  )
}
