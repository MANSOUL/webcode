import React from 'react'
import Editor from '../editor'
import './index.less'

export default function Layout() {
  return (
    <div className="webcode-layout">
      <div className="webcode-layout__toolbar"></div>
      <div className="webcode-layout__container">
        <div className="webcode-layout__extensions"></div>
        <div className="webcode-layout__filetree"></div>
        <div className="webcode-layout__content">
          <Editor />
        </div>
      </div>
      <div className="webcode-layout__footbar"></div>
    </div>
  )
}
