import React from 'react'
import FileTree from '@src/components/fileTree'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProject } from '@src/store/project/actions'
import { fetchFile } from '@src/store/files/actions'
import { AppStore } from '@src/store'

export default function MyFileTree() {
  const dispatch = useDispatch()
  const project = useSelector((store: AppStore) => store.project)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    projectChange()
  }, [project])

  React.useEffect(() => {
    dispatch(fetchProject('demo'))
  }, [])

  const projectChange = () => {
    const { loading, error, errorMessage, fileStructure } = project
    if (fileStructure) {
      setData(fileStructure)
    }
  }

  const handleFileClick = (id: string, relative: string, type: string) => {
    console.log(id, relative, type)
    if (type === 'file') {
      dispatch(fetchFile('demo', relative, id))
    }
  }

  return <FileTree data={data} onFileClick={handleFileClick} />
}
