import './index.less'
import React from 'react'
import { TabProps, TabSwicherProps, TabContainerProps } from './interface'
import { getTargetParent, childIndex } from '@src/utils/dom'
import clsx from 'clsx'
export { default as TabButton } from './tabButton'
export { default as TabItem } from './tabItem'

export function TabSwicher({ children, className }: TabSwicherProps) {
  return (
    <div className={clsx('webcode-tab-switcher', className)}>{children}</div>
  )
}

export function TabContainer({ children, className }: TabContainerProps) {
  return (
    <div className={clsx('webcode-tab-container', className)}>{children}</div>
  )
}

export default function Tab({ children, onTabChange }: TabProps) {
  const handleProxyClick = (event: React.MouseEvent) => {
    const targetParent = getTargetParent(
      event.target as HTMLElement,
      'webcode-tab-button',
      event.currentTarget as HTMLElement
    )
    if (targetParent && targetParent.parentElement) {
      onTabChange(childIndex(targetParent, targetParent.parentElement))
    }
  }

  return (
    <div className="webcode-tab" onClick={handleProxyClick}>
      {children}
    </div>
  )
}
