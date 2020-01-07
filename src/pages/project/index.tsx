import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import './index.less'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from '@src/components/ui/dialog'
import Button from '@src/components/ui/button'
import mFetch from '@src/utils/mFetch'
import { API_PROJECTS } from '@src/api/project'
import formatTime from '@src/utils/formatTime'

const randomBetween = (below: number = 0, upper: number = 255) =>
  Math.floor(Math.random() * (upper - below)) + below
const randomColor = () =>
  `rgb(${randomBetween(100, 200)},${randomBetween(100, 200)},${randomBetween(
    100,
    200
  )})`

interface IconProps {
  name: string
}

interface Project {
  name: string
  createdAt: number
}

function Icon({ name }: IconProps) {
  const refColor = React.useRef({ backgroundColor: randomColor() })
  return (
    <div className="project__icon" style={refColor.current}>
      <span>{name.substring(0, 1)}</span>
    </div>
  )
}

function App() {
  const [open, setOpen] = React.useState(false)
  const [project, setProject] = React.useState('')
  const [list, setList] = React.useState<Project[]>([])
  const [tip, setTip] = React.useState({
    open: false,
    errorMessage: ''
  })
  const toggleOpen = () => setOpen(true)

  React.useEffect(() => {
    requestProjects()
  }, [])

  const requestProjects = async () => {
    try {
      const res = await mFetch(API_PROJECTS)
      if (res.status === 200) {
        setList(res.data.projects)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const createProject = async (name: string) => {
    try {
      const res = await mFetch(API_PROJECTS, 'post', { name })
      if (res.status === 200) {
        window.location.href = `./editor.html?project=${name}`
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleGotoEditor = (project: string) => () =>
    (window.location.href = `./editor.html?project=${project}`)
  const handleChange = (e: React.ChangeEvent) =>
    setProject((e.target as HTMLInputElement).value)
  const handleCancel = () => setOpen(false)
  const handleConfirm = () => {
    if (!/^[a-zA-Z0-9]+$/.test(project)) {
      setTip({
        open: true,
        errorMessage: '项目名不能为空且只能为字母和数字'
      })
      return
    }
    createProject(project)
    setOpen(false)
  }
  return (
    <div className="page-project">
      <header className="project-header">
        <h1 className="project-header__icon">Web Code</h1>
      </header>
      <div className="project-container">
        <button className="project" onClick={toggleOpen}>
          <Icon name="+" />
          <div className="project__detail">
            <p className="project__title">创建项目</p>
            <p className="project__date"></p>
          </div>
        </button>
        <ul className="project-list">
          {list.map(item => (
            <li
              className="project"
              key={item.name}
              onClick={handleGotoEditor(item.name)}
            >
              <Icon name={item.name} />
              <div className="project__detail">
                <p className="project__title">{item.name.toUpperCase()}</p>
                <p className="project__date">
                  创建时间：{formatTime(item.createdAt, 'yyyy-MM-dd')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={open}>
        <DialogTitle>请输入项目名称</DialogTitle>
        <DialogContent>
          <div>
            <input
              className="project-name"
              value={project}
              onChange={handleChange}
            />
            {tip.open ? (
              <p className="project-tip">{tip.errorMessage}</p>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleCancel}>
            取消
          </Button>
          <Button size="small" type="primary" onClick={handleConfirm}>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

render(<App />, document.getElementById('app'))
