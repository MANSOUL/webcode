import './index.less'
import React from 'react'
import FootbarItem from '../footbarItem'

export interface Props {
  onClick?: () => void
}

export default function FootbarTerminal({ onClick }: Props) {
  return (
    <FootbarItem className="webcode-fb-terminal" title="终端" onClick={onClick}>
      <i className="iconfont icon-terminal1 webcode-fb-terminal__icon" />
    </FootbarItem>
  )
}
