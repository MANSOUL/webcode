import './index.less'
import React from 'react'
import clsx from 'clsx'
import { createStyles } from '@src/theme'
import { ReactSVG } from 'react-svg'

const useStyles = createStyles(theme => ({
  svg: {
    backgroundColor: theme.colors['statusBar.background'],
    color: theme.colors['panelTitle.activeForeground'] || '#EFFFFF',
    fill: theme.colors['panelTitle.activeForeground'] || '#EFFFFF'
  }
}))

export interface SvgButtonProps {
  svg: string
  onClick?: () => void
}

export default function SvgButton({ svg, onClick }: SvgButtonProps) {
  const classes = useStyles()
  return (
    <a className={clsx('svg-button', classes.svg)} onClick={onClick}>
      <ReactSVG
        src={svg}
        beforeInjection={svg => {
          svg.classList.add('svg-button__svg')
        }}
      />
    </a>
  )
}
