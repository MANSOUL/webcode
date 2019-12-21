import './index.less'
import React from 'react'
import { FileTreeFolderProps } from '../interface'
import clsx from 'clsx'
import File, { NewFile } from '../file'
import RecursionFile from '../recursionFile'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectCreateFile,
  projectCreateFolder
} from '@src/store/project/actions'
import { fileExist } from '@src/store/project/util'
import { AppStore } from '@src/store'

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
  const project = useSelector((store: AppStore) => store.project)
  const [fileError, setFileError] = React.useState({
    error: false,
    errorMessage: ''
  })

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

  const handleCreateFileCancel = () => {
    setFileError({ error: false, errorMessage: '' })
    setNewFileOpen(false)
  }

  const handleNewFileNameChange = (name: string) => {
    if (fileExist(project.fileStructure, relative, name)) {
      setFileError({ error: true, errorMessage: '此文件夹下已存在同名文件' })
    } else {
      setFileError({ error: false, errorMessage: '' })
    }
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
            onNameChange={handleNewFileNameChange}
            error={fileError.error}
            errorMessage={fileError.errorMessage}
          />
        ) : null}
        <RecursionFile files={files} onFileClick={onFileClick} level={level} />
      </div>
    </div>
  )
}
