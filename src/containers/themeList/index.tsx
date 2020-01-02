import React from 'react'
import List, { ListItem } from '@src/components/ui/list'
import './index.less'
import { createStyles } from '@src/theme'
import clsx from 'clsx'

const useStyles = createStyles(theme => ({
  listItem: {
    color: theme.colors['sideBar.foreground'],
    '&:hover': {
      backgroundColor: theme.colors['list.hoverBackground'],
      color: theme.colors['list.hoverForeground']
    }
  },
  listItemFocus: {
    backgroundColor: `${theme.colors['list.focusBackground']} !important`,
    color: `${theme.colors['list.focusForeground']} !important`
    // backgroundColor: `${theme.colors['listFilterWidget.background']} !important`,
    // color: `${theme.colors['list.highlightForeground']} !important`
  }
}))

export default function ThemeList() {
  const classes = useStyles()
  return (
    <List className="webcode-themelist">
      <ListItem
        divider={false}
        className={clsx('webcode-themelist-item', classes.listItem)}
      >
        Horizon
      </ListItem>
      <ListItem
        divider={false}
        className={clsx('webcode-themelist-item', classes.listItem)}
      >
        Material Default
      </ListItem>
    </List>
  )
}
