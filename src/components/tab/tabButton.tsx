import React from 'react'
import FileIcon from '../fileIcon'
import { TabButtonProps } from './interface'
import clsx from 'clsx'
import TabDot from './tabDot'

export default function TabButton({
  fileName,
  modified,
  filePath,
  active = false,
  className,
  onClick,
  onClose
}: TabButtonProps) {
  const [hover, setHover] = React.useState(false)

  const handleMouseOver = () => {
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  const handleClick = () => {
    onClick && onClick()
  }

  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    onClose && onClose()
  }

  return (
    <div
      className={clsx(
        'webcode-tab-button',
        {
          'webcode-tab-button--active': active
        },
        className
      )}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <FileIcon type="file" fileName={fileName} />
      <span className="webcode-tab-button__name">{fileName}</span>
      <TabDot
        modified={modified}
        active={active}
        buttonHover={hover}
        onClick={handleCloseClick}
      />
    </div>
  )
}
