import './index.less'
import React from 'react'
import clsx from 'clsx'

export interface Props {
  children: any
  onClick?: () => void
  className?: string
  title?: string
}

export default function FootbarItem({
  children,
  onClick,
  className,
  title = ''
}: Props) {
  return (
    <div
      className={clsx('webcode-fb-item', className)}
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  )
}
