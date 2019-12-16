import React from 'react'
import FileTree from '@src/components/fileTree'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProject } from '@src/store/project/actions'
import { AppStore } from '@src/store'

export default function MyFileTree() {
  const dispatch = useDispatch()
  const project = useSelector((store: AppStore) => store.project)
  const [data, setData] = React.useState(null)

  const projectChange = () => {
    const { loading, error, errorMessage, data } = project
    if (data) {
      setData(data)
    }
  }

  React.useEffect(() => {
    projectChange()
  }, [project])

  React.useEffect(() => {
    dispatch(fetchProject('demo'))
  }, [])

  return <FileTree data={data} />
}
