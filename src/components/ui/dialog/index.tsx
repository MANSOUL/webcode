import './index.less'
import * as React from 'react'
import clsx from 'clsx'
import Modal from '../modal'
import { createPortal } from 'react-dom'

export interface DialogTitleProps {
  children?: any
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <div className="dialog__title">{children}</div>
}

export interface DialogContentProps {
  children?: any
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="dialog__content">{children}</div>
}

export interface DialogActionsProps {
  children?: any
}

export function DialogActions({ children }: DialogActionsProps) {
  return <div className="dialog__actions">{children}</div>
}

export interface Props {
  open?: boolean
  children?: any
  className?: string
  onClose?: (flag: boolean) => void
  transparent?: boolean
}

export default function Dialog({
  open,
  children,
  transparent,
  className,
  onClose
}: Props) {
  const handleModalClick = () => {
    onClose && onClose(false)
  }

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
    return false
  }

  return (
    <Modal open={open} className="modal--dialog" transparent={transparent}>
      {createPortal(
        <div className="dialog-container">
          <div
            className={clsx('dialog', { [`dialog--open`]: open }, className)}
            onClick={handleStopPropagation}
          >
            {children}
          </div>
        </div>,
        document.body
      )}
    </Modal>
  )
}
