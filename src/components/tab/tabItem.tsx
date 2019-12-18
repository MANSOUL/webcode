import React from 'react'
import clsx from 'clsx'
import { TabItemProps } from './interface'

export default function TabItem({ tab, activeTab, children }: TabItemProps) {
  return (
    <div
      className={clsx('webcode-tab-item', {
        'webcode-tab-item--active': tab === activeTab
      })}
    >
      {children}
    </div>
  )
}
