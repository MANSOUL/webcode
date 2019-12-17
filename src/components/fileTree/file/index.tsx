import './index.less'
import React from 'react'
import { FileTreeFileProps } from '../interface'
import clsx from 'clsx'
import FileIcon from '@src/components/fileIcon'

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
      <FileIcon type={type} fileName={name} />
      <span className="webcode-filetree-file__name">{name}</span>
    </div>
  )
}
