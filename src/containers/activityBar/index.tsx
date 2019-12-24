import './index.less'
import React from 'react'
import { createStyles } from '@src/theme'
export { default as ActivityBarItem } from './item'

const useStyles = createStyles(theme => ({}))

export interface Props {
  children?: any
}

export default function ActivityBar({ children }: Props) {
  return <div className="webcode-extension-bar">{children}</div>
}
