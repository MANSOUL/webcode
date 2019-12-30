import React from 'react'
import List, {
  ListItem,
  ListItemProps,
  ListProps
} from '@src/components/ui/list'
import './index.less'
import { createStyles } from '@src/theme'
import clsx from 'clsx'

const useStyles = createStyles(theme => ({
  menu: { backgroundColor: theme.colors['editorWidget.background'] }
}))

export default function Menu({ children, ...props }: ListProps) {
  const classes = useStyles()
  return (
    <List className={clsx('webcode-filetree-menu', classes.menu)} {...props}>
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
