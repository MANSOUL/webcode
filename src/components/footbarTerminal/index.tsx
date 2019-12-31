import './index.less'
import React from 'react'
import FootbarItem from '../footbarItem'
import { ReactSVG } from 'react-svg'
import svgTerminal from '@src/aseets/svg/terminal.svg'
import clsx from 'clsx'
export interface Props {
  onClick?: () => void
  className?: string
}

export default function FootbarTerminal({ onClick, className }: Props) {
  return (
    <FootbarItem
      className={clsx('webcode-fb-terminal', className)}
      title="终端"
      onClick={onClick}
    >
      <ReactSVG
        src={svgTerminal}
        beforeInjection={svg => {
          svg.classList.add('webcode-fb-terminal__svg')
        }}
        wrapper="div"
        className="webcode-fb-terminal__icon"
      />
    </FootbarItem>
  )
}
