import './index.less'
import React from 'react'
import clsx from 'clsx'

export interface Props {
  children?: string
  onClick?: () => void
  className?: string
  type?: 'primary' | 'danger'
  round?: boolean
  size?: 'large' | 'middle' | 'small'
}

export default function Button({
  children,
  onClick,
  className,
  type,
  round = true,
  size = 'middle'
}: Props) {
  return (
    <a
      className={clsx(
        'spui-button',
        type ? `spui-button--${type}` : '',
        `spui-button--${size}`,
        { 'spui-button--round': round },
        className
      )}
      onClick={onClick}
    >
      <span className="spui-button__label">{children}</span>
    </a>
  )
}
