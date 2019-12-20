import React from 'react'
import List, {
  ListItem,
  ListItemProps,
  ListProps
} from '@src/components/ui/list'
import './index.less'

export default function Menu({ children, ...props }: ListProps) {
  return (
    <List className="webcode-filetree-menu" {...props}>
      {children}
    </List>
  )
}

export function MenuItem({ children, ...props }: ListItemProps) {
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
