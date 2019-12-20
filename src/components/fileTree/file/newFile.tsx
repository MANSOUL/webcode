import './index.less'
import React from 'react'
import clsx from 'clsx'
import FileIcon from '@src/components/fileIcon'
import { trim } from 'lodash'

const PADDING_LEFT = 10

export interface NewFileProps {
  type: 'file' | 'folder'
  level: number
  initialValue?: string
  onDone: (name: string) => void
  onCancel: () => void
}

export default function NewFile({
  level = 1,
  onDone,
  onCancel,
  type,
  initialValue = ''
}: NewFileProps) {
  const [name, setName] = React.useState(initialValue)
  const refName = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    refName.current && refName.current.focus()
  }, [])

  const createFile = () => {
    if (trim(name).length === 0) {
      onCancel()
      return
    }
    onDone(name)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    return false
  }

  const handleNameBlur = () => createFile()

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      createFile()
    }
  }

  const handleNameChange = (e: React.ChangeEvent) => {
    setName((e.target as HTMLInputElement).value)
  }

  return (
    <div
      className={clsx('webcode-filetree-file', {
        'webcode-filetree-file--active': true
      })}
      style={{ paddingLeft: level * PADDING_LEFT }}
      onContextMenu={handleContextMenu}
    >
      <FileIcon type={type} fileName={name} />
      <input
        className="webcode-filetree-file__name"
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onKeyDown={handleKeyDown}
        ref={refName}
        value={name}
      />
    </div>
  )
}
