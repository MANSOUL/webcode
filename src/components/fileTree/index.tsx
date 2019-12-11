import React, { Children } from 'react'
import {
  getIconForFile,
  getIconForFolder,
  getIconForOpenFolder
} from 'vscode-icons-js'
import './index.less'

const ICON_BASE_PATH =
  'https://dderevjanik.github.io/vscode-icons-js-example/icons/'

interface FileTreeFile {
  name: string
  children: FileTreeFile[]
  type: 'folder' | 'file'
}

interface FileTreeFolderProps {
  children?: any
  open?: boolean
}

interface FileTreeFileProps {
  name: string
  type?: 'folder' | 'file'
}

function Folder({ children }: FileTreeFolderProps) {
  return (
    <div>
      <File name="src" type="folder" />
      <div>
        <File name="index.js" />
        <File name="index.css" />
        <File name="index.html" />
      </div>
    </div>
  )
}

function File({ name, type = 'file' }: FileTreeFileProps) {
  const iconPath: string | undefined =
    type === 'file' ? getIconForFile(name) : getIconForFolder(name)
  return (
    <div className="webcode-filetree-file">
      <img
        className="webcode-filetree-file__icon"
        src={ICON_BASE_PATH + iconPath}
      />
      <span className="webcode-filetree-file__name">{name}</span>
    </div>
  )
}

export default function FileTree() {
  return (
    <div className="webcode-filetree">
      <Folder />
    </div>
  )
}
