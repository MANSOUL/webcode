import React from 'react'
import Tab, {
  TabButton,
  TabItem,
  TabSwicher,
  TabContainer
} from '@src/components/tab'
import { useSelector } from 'react-redux'
import { AppStore } from '@src/store'
import MyEditor from '../editor'

export default function MyTab() {
  const [tab, setTab] = React.useState(0)
  const files = useSelector((store: AppStore) => store.files)

  const handleTabChange = (index: number) => setTab(index)
  return (
    <Tab onTabChange={handleTabChange}>
      <TabSwicher>
        {files.fileContents.map((item, index: number) => (
          <TabButton
            key={item.id}
            fileName={item.relative}
            modified={item.modified}
            filePath={item.relative}
            active={tab === index}
          />
        ))}
      </TabSwicher>
      <TabContainer>
        {files.fileContents.map((item, index: number) => (
          <TabItem key={item.id} tab={index} activeTab={tab}>
            <MyEditor fileKey={item.id} />
          </TabItem>
        ))}
      </TabContainer>
    </Tab>
  )
}
