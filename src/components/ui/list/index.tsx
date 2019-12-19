import './index.less'
import * as React from 'react'
import clsx from 'clsx'

export interface ListItemProps {
  children?: any
  arrow?: boolean
  rightContent?: any
  divider?: boolean
  onClick?: () => void
  className?: string
}

export function ListItem({
  children,
  arrow,
  divider = true,
  rightContent,
  onClick,
  className
}: ListItemProps) {
  return (
    <li
      className={clsx('list-item', className, {
        'list-item--divider': divider
      })}
      onClick={onClick}
    >
      <div className="list-item__left">{children}</div>
      <div className="list-item__right">
        <div className="list-item__right-content">{rightContent}</div>
        {arrow ? <i className="iconfont icon-arrow list-item__arrow" /> : null}
      </div>
    </li>
  )
}

export interface ListProps {
  children?: any
  className?: string
}

export default function List({ children, className }: ListProps) {
  return <ul className={clsx('list', className)}>{children}</ul>
}
