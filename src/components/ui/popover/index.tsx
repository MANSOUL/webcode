import './index.less'
import * as React from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import Modal from '../modal'

const getPosition = (el: HTMLElement | null | undefined) => {
  if (!el) {
    return {}
  }
  const rect = el.getBoundingClientRect()
  return {
    width: rect.width,
    left: rect.left,
    bottom: window.innerHeight - rect.top + 20
  }
}

export interface Props {
  open?: boolean
  children?: any
  anchorByEl?: boolean
  anchorEl?: HTMLElement | null
  pos?: any
  onClose?: () => void
}

export default function Popover({
  open = false,
  children,
  anchorEl,
  anchorByEl = false,
  pos,
  onClose
}: Props) {
  const [innerOpen, setInnerOpen] = React.useState(false)
  const [position, setPosition] = React.useState(getPosition(anchorEl))

  if (innerOpen !== open) {
    setInnerOpen(open)
    if (anchorByEl) {
      setPosition(getPosition(anchorEl))
    } else if (pos) {
      setPosition(pos)
    }
  }

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
    return false
  }

  return (
    <Modal open={innerOpen} onClick={onClose} transparent>
      {createPortal(
        <div
          style={position}
          className={clsx('popover', { 'popover--open': innerOpen })}
          onClick={handleStopPropagation}
        >
          {children}
        </div>,
        document.body
      )}
    </Modal>
  )
}
