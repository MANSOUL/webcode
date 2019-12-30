import './index.less'
import React from 'react'
import { FileTreeProjectProps } from '../interface'
import RecursionFile from '../recursionFile'
import Options from '../options'
import { createStyles } from '@src/theme'
import clsx from 'clsx'

const useStyles = createStyles(theme => ({
  listItem: {}
}))

export default function FileTreeProject({
  project,
  onFileClick
}: FileTreeProjectProps) {
  const classes = useStyles()
  return (
    <div className="webcode-filetree-project">
      <div className={clsx('webcode-filetree-project__info', classes.listItem)}>
        <span className="webcode-filetree-project__name">{project.name}</span>
        <Options />
      </div>
      <RecursionFile
        files={project.children}
        onFileClick={onFileClick}
        level={0}
      />
    </div>
  )
}
