import React from 'react'
import { render } from 'react-dom'
import './index.less'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from '@src/components/ui/dialog'
import Button from '@src/components/ui/button'

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

function Icon({ name }: IconProps) {
  return (
    <div className="project__icon" style={{ backgroundColor: randomColor() }}>
      <span>{name.substring(0, 1)}</span>
    </div>
  )
}

function App() {
  const [open, setOpen] = React.useState(false)
  const [project, setProject] = React.useState('')
  const toggleOpen = () => setOpen(true)
  const handleChange = (e: React.ChangeEvent) =>
    setProject((e.target as HTMLInputElement).value)
  const handleCancel = () => setOpen(false)
  const handleConfirm = () => {
    // TODO create project

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
          <li className="project">
            <Icon name="demo" />
            <div className="project__detail">
              <p className="project__title">DEMO</p>
              <p className="project__date">创建时间：2018-06-09</p>
            </div>
          </li>
          <li className="project">
            <Icon name="demo" />
            <div className="project__detail">
              <p className="project__title">DEMO</p>
              <p className="project__date">创建时间：2018-06-09</p>
            </div>
          </li>
          <li className="project">
            <Icon name="demo" />
            <div className="project__detail">
              <p className="project__title">DEMO</p>
              <p className="project__date">创建时间：2018-06-09</p>
            </div>
          </li>
          <li className="project">
            <Icon name="demo" />
            <div className="project__detail">
              <p className="project__title">DEMO</p>
              <p className="project__date">创建时间：2018-06-09</p>
            </div>
          </li>
          <li className="project">
            <Icon name="demo" />
            <div className="project__detail">
              <p className="project__title">DEMO</p>
              <p className="project__date">创建时间：2018-06-09</p>
            </div>
          </li>
        </ul>
      </div>
      <Dialog open={open}>
        <DialogTitle>请输入项目名称</DialogTitle>
        <DialogContent>
          <input
            className="project-name"
            value={project}
            onChange={handleChange}
          />
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
