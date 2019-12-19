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
      <Popover
        open={menuOpen}
        onClose={handleMenuClose}
        anchorByEl={false}
        pos={menuPos}
      >
        <Menu>
          {type !== 'file' ? <MenuItem>新建文件</MenuItem> : null}
          {type !== 'file' ? <MenuItem>新建文件夹</MenuItem> : null}
          <MenuItem>重命名</MenuItem>
          <MenuItem>删除</MenuItem>
        </Menu>
      </Popover>
    </div>
  )
}
