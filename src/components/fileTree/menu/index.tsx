import React from 'react'
import List, { ListItem } from '@src/components/ui/list'
import './index.less'

export interface MenuProps {
  children?: any
}

export interface MenuItemProps {
  children?: any
}

export default function Menu({ children, ...props }: MenuProps) {
  return (
    <List className="webcode-filetree-menu" {...props}>
      {children}
    </List>
  )
}

export function MenuItem({ children, ...props }: MenuItemProps) {
  return (
    <ListItem
      className="webcode-filetree-menu__item"
      {...props}
      divider={false}
    >
      {children}
    </ListItem>
  )
}
