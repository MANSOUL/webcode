import React from 'react'
import Tab, {
  TabButton,
  TabItem,
  TabSwicher,
  TabContainer
} from '@src/components/tab'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '@src/store'
import MyEditor from '../editor'
import { getFileIndex } from '@src/store/files/util'
import { changeCurrentFile, fileCloseFile } from '@src/store/files/actions'
import { FileContent } from '@src/store/files'

export default function MyTab() {
  const [tab, setTab] = React.useState(0)
  const files = useSelector((store: AppStore) => store.files)
  const dispatch = useDispatch()

  // change id by file store id
  const nextTab = getFileIndex(files.fileContents, files.currentFileId)
  if (tab !== nextTab) {
    setTab(nextTab)
  }

  const handleTabChange = (index: number) => {
    dispatch(changeCurrentFile(files.fileContents[index].id))
  }

  const handleTabClose = (item: FileContent) => () =>
    dispatch(fileCloseFile(item.id))

  return (
    <Tab onTabChange={handleTabChange}>
      <TabSwicher>
        {files.fileContents.map((item, index: number) => (
          <TabButton
            key={item.id}
            fileName={item.fileName}
            modified={item.modified}
            filePath={item.relative}
            active={tab === index}
            onClose={handleTabClose(item)}
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
