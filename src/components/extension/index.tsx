import './index.less'
import React from 'react'

export interface Props {}

export default function Extension({}: Props) {
  return (
    <div className="webcode-extension-bar">
      <div className="webcode-extension-bar__item webcode-extension-bar__item--active">
        <a className="webcode-extension-bar__icon">
          <i className="iconfont icon-ccfile" />
        </a>
      </div>
    </div>
  )
}
