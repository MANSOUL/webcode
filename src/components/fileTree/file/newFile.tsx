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
  onNameChange?: (name: string) => void
  error?: boolean
  errorMessage?: string
}

export default function NewFile({
  level = 1,
  onDone,
  onCancel,
  type,
  initialValue = '',
  onNameChange,
  error = false,
  errorMessage = ''
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

  const handleNameBlur = () => {
    if (error) {
      onCancel()
      return
    }
    createFile()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // ESC
    if (event.keyCode === 27) {
      onCancel()
      return
    }
    // ENTER
    if (event.keyCode === 13) {
      event.preventDefault()
      if (error) return
      createFile()
    }
  }

  const handleNameChange = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value
    setName(value)
    onNameChange && onNameChange(value)
  }

  return (
    <div
      className={clsx('webcode-filetree-file', {
        'webcode-filetree-file--active': true
      })}
      style={{ paddingLeft: level * PADDING_LEFT }}
      onContextMenu={handleContextMenu}
    >
      <div className="webcode-filetree-file__info">
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
      {error ? (
        <div className="webcode-filetree-file__error">{errorMessage}</div>
      ) : null}
    </div>
  )
}
