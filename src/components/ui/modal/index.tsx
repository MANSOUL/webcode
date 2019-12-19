import './index.less'
import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

export interface Props {
  open?: boolean
  children?: React.ReactElement | React.ReactElement[]
  onClick?: () => void
  className?: string
  transparent?: boolean
}

export default function Modal({
  open = false,
  transparent = false,
  children,
  onClick,
  className
}: Props) {
  const [innerOpen, setInnerOpen] = React.useState(false)
  const [remove, setRemove] = React.useState(true)

  if (innerOpen !== open) {
    setInnerOpen(open)
    setRemove(false)
  }

  const handleAnimationEnd = () => {
    setRemove(true)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClick && onClick()
  }

  if (remove && !innerOpen) {
    return null
  }

  return createPortal(
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={clsx(
        'modal',
        { 'modal--open': innerOpen, 'modal--transparent': transparent },
        className
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>,
    document.body
  )
}
