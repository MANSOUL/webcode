import './index.less'
import React from 'react'
import { FileTreeFileProps } from '../interface'
import clsx from 'clsx'
import FileIcon from '@src/components/fileIcon'
import Popover from '@src/components/ui/popover'
import Menu, { MenuItem } from '../menu'
import NewFile from './newFile'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectRenameFile,
  projectRemoveFile
} from '@src/store/project/actions'
import { AppStore } from '@src/store'
import { fileExist } from '@src/store/project/util'
import { createStyles } from '@src/theme'
import Options from '../options'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions
} from '@src/components/ui/dialog'
import Button from '@src/components/ui/button'
import svgLoading from '@src/aseets/svg/loading.svg'
import { ReactSVG } from 'react-svg'
export { default as NewFile } from './newFile'

const PADDING_LEFT = 10

const useStyles = createStyles(theme => ({
  listColor: {
    color: theme.colors['sideBar.foreground'],
    fill: theme.colors['sideBar.foreground']
  },
  listItem: {
    color: theme.colors['sideBar.foreground'],
    '&:hover': {
      backgroundColor: theme.colors['list.hoverBackground'],
      color: theme.colors['list.hoverForeground']
    }
  },
  listItemFocus: {
    backgroundColor: `${theme.colors['list.focusBackground']} !important`,
    color: `${theme.colors['list.focusForeground']} !important`
    // backgroundColor: `${theme.colors['listFilterWidget.background']} !important`,
    // color: `${theme.colors['list.highlightForeground']} !important`
  }
}))

export default function File({
  id,
  relative,
  name,
  type = 'file',
  level = 1,
  active = false,
  onClick,
  onCreateFile,
  onCreateFolder
}: FileTreeFileProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [menuPos, setMenuPos] = React.useState({})
  const [editable, setEditable] = React.useState(false)
  const dispatch = useDispatch()
  const project = useSelector((store: AppStore) => store.project)
  const [fileError, setFileError] = React.useState({
    error: false,
    errorMessage: ''
  })
  const [dialog, setDialog] = React.useState({
    open: false,
    title: '',
    content: ''
  })
  const classes = useStyles()

  const relatives = relative.split('/')
  const relativePath =
    relatives.length === 0 ? '' : relatives.slice(0, -1).join('/')

  const handleClick = () => {
    onClick && onClick(id, relative, type)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setMenuPos({
      top: event.clientY,
      left: event.clientX
    })
    setMenuOpen(true)
    return false
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  const handleRenameFileDone = (fname: string) => {
    dispatch(projectRenameFile(id, fname, name, relativePath))
    setEditable(false)
  }

  const handleRenameFileCancel = () => {
    setFileError({ error: false, errorMessage: '' })
    setEditable(false)
  }

  const handleCreateFile = () => {
    onCreateFile && onCreateFile()
    setMenuOpen(false)
  }

  const handleCreateFolder = () => {
    onCreateFolder && onCreateFolder()
    setMenuOpen(false)
  }

  const handleRenameFile = () => {
    setEditable(true)
    setMenuOpen(false)
  }

  const handleRemoveFile = () => {
    setDialog({
      open: true,
      title: `确定要删除 ${name} ?`,
      content: '文件删除后不可恢复'
    })
  }

  const handleNewFileNameChange = (fname: string) => {
    if (
      fileExist(project.fileStructure, relativePath, fname) &&
      fname !== name
    ) {
      setFileError({ error: true, errorMessage: '此文件夹下已存在同名文件' })
    } else {
      setFileError({ error: false, errorMessage: '' })
    }
  }

  const handleCancelRemoveFile = () => setDialog({ ...dialog, open: false })

  const handleConfirmRemoveFile = () => {
    dispatch(projectRemoveFile(id, relativePath, name))
    setMenuOpen(false)
  }

  if (editable) {
    return (
      <NewFile
        type="file"
        initialValue={name}
        level={level}
        onDone={handleRenameFileDone}
        onCancel={handleRenameFileCancel}
        onNameChange={handleNewFileNameChange}
        error={fileError.error}
        errorMessage={fileError.errorMessage}
        className={classes.listItem}
      />
    )
  }

  return (
    <div
      className={clsx('webcode-filetree-file', classes.listItem, {
        [classes.listItemFocus]: active
      })}
      style={{ paddingLeft: level * PADDING_LEFT }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="webcode-filetree-file__info">
        {type === 'file' ? (
          <ReactSVG
            src={svgLoading}
            afterInjection={(error, svg) => {
              if (error) {
                console.error(error)
                return
              }
            }}
            beforeInjection={svg => {
              svg.classList.add('webcode-filetree-file__loading-svg')
              svg.classList.add(classes.listColor)
            }}
            evalScripts="always"
            fallback={() => <span>Error!</span>}
            loading={() => <span>Loading</span>}
            renumerateIRIElements={false}
            wrapper="div"
            className="webcode-filetree-file__loading"
          />
        ) : null}
        {type !== 'project' ? <FileIcon type={type} fileName={name} /> : null}
        <span
          className={clsx('webcode-filetree-file__name', {
            'webcode-filetree-project__name': type === 'project'
          })}
        >
          {name}
        </span>
      </div>
      <Options
        rename={type !== 'project'}
        trash={type !== 'project'}
        addFile={type !== 'file'}
        addFolder={type !== 'file'}
        onRename={handleRenameFile}
        onAddFile={handleCreateFile}
        onAddFolder={handleCreateFolder}
        onTrash={handleRemoveFile}
      />
      <Popover
        open={menuOpen}
        onClose={handleMenuClose}
        anchorByEl={false}
        pos={menuPos}
      >
        <Menu>
          {type !== 'file' ? (
            <MenuItem onClick={handleCreateFile}>新建文件</MenuItem>
          ) : null}
          {type !== 'file' ? (
            <MenuItem onClick={handleCreateFolder}>新建文件夹</MenuItem>
          ) : null}
          <MenuItem onClick={handleRenameFile}>重命名</MenuItem>
          <MenuItem onClick={handleRemoveFile}>删除</MenuItem>
        </Menu>
      </Popover>
      <Dialog open={dialog.open} onClose={handleCancelRemoveFile} transparent>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>{dialog.content}</DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleCancelRemoveFile}>
            取消
          </Button>
          <Button type="danger" size="small" onClick={handleConfirmRemoveFile}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
