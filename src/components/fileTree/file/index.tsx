import './index.less'
import React from 'react'
import {
  getIconForFile,
  getIconForFolder,
  getIconForOpenFolder
} from 'vscode-icons-js'
import { FileTreeFileProps } from '../interface'
import clsx from 'clsx'

const ICON_BASE_PATH =
  'https://dderevjanik.github.io/vscode-icons-js-example/icons/'
const PADDING_LEFT = 10

export default function File({
  id,
  relative,
  name,
  type = 'file',
  level = 1,
  active = false,
  onClick
}: FileTreeFileProps) {
  const iconPath: string | undefined =
    type === 'file'
      ? getIconForFile(name)
      : type === 'folder'
      ? getIconForFolder(name)
      : getIconForOpenFolder(name)

  const handleClick = () => {
    onClick && onClick(id, relative, type)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    return false
  }

  return (
    <div
      className={clsx('webcode-filetree-file', {
        'webcode-filetree-file--active': active
      })}
      style={{ paddingLeft: level * PADDING_LEFT }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <i
        className="webcode-filetree-file__icon"
        style={{ backgroundImage: `url(${ICON_BASE_PATH + iconPath})` }}
      />
      <span className="webcode-filetree-file__name">{name}</span>
    </div>
  )
}
