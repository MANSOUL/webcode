import './index.less'
import React from 'react'
import FileIcon from '../fileIcon'
import clsx from 'clsx'
import TabButton from './tabButton'
import { TabProps } from './interface'
import TabItem from './tabItem'

export default function Tab({ tabs }: TabProps) {
  const [tab, setTab] = React.useState(0)

  const handleButtonClick = (index: number) => () => setTab(index)

  return (
    <div className="webcode-tab">
      <div className="webcode-tab-switcher">
        <TabButton
          onClick={handleButtonClick(0)}
          fileName="a.js"
          modified={true}
          filePath="a.js"
          active={tab === 0}
        />
        <TabButton
          onClick={handleButtonClick(1)}
          fileName="a.js"
          modified={true}
          filePath="a.js"
          active={tab === 1}
        />
      </div>
      <div className="webcode-tab-container">
        <TabItem tab={0} activeTab={tab}>
          0
        </TabItem>
        <TabItem tab={1} activeTab={tab}>
          1
        </TabItem>
      </div>
    </div>
  )
}
