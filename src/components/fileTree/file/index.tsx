import './index.less'
import React from 'react'
import { FileTreeFileProps } from '../interface'
import clsx from 'clsx'
import FileIcon from '@src/components/fileIcon'
import Popover from '@src/components/ui/popover'
import Menu, { MenuItem } from '../menu'

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
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [menuPos, setMenuPos] = React.useState({})
  const [editable, setEditable] = React.useState(false)
  const refName = React.useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    onClick && onClick(id, relative, type)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setMenuPos({
      top: event.clientY,
      left: event.clientX
    })
    setMenuOpen(true)
    return false
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const handleNameBlur = () => {
    setEditable(false)
  }

  const handleNameChange = (e: React.FormEvent) => {
    console.log((e.target as HTMLInputElement).value)
  }

  const handleCreateFile = () => {}
  const handleCreateFolder = () => {}
  const handleRenameFile = () => {
    setEditable(true)
    setMenuOpen(false)
    setTimeout(() => refName.current && refName.current.focus())
  }
  const handleRemoveFile = () => {}

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
      <span
        className="webcode-filetree-file__name"
        contentEditable={editable}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        ref={refName}
        suppressContentEditableWarning
      >
        {name}
      </span>
      <Popover
        open={menuOpen}
        onClose={handleMenuClose}
        anchorByEl={false}
        pos={menuPos}
      >
        <Menu>
          {type !== 'file' ? (
            <MenuItem onClick={handleCreateFile}>新建文件</MenuItem>
          ) : null}
          {type !== 'file' ? (
            <MenuItem onClick={handleCreateFolder}>新建文件夹</MenuItem>
          ) : null}
          <MenuItem onClick={handleRenameFile}>重命名</MenuItem>
          <MenuItem onClick={handleRemoveFile}>删除</MenuItem>
        </Menu>
      </Popover>
    </div>
  )
}
