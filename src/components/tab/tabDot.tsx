import React from 'react'
import { TabDotProps } from './interface'

export default function TabDot({ modified = true, onClick }: TabDotProps) {
  const [hover, setHover] = React.useState(false)

  const handleMouseOver = () => {
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  return (
    <a
      className="webcode-tab-button__op"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {!modified || hover ? (
        <i
          className="iconfont icon-close webcode-tab-button__close"
          onClick={onClick}
        />
      ) : (
        <i className="webcode-tab-button__dot" />
      )}
    </a>
  )
}
