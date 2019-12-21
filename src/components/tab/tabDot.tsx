import React from 'react'
import { TabDotProps } from './interface'

export default function TabDot({
  modified = true,
  onClick,
  active = false,
  buttonHover = false
}: TabDotProps) {
  const [hover, setHover] = React.useState(false)

  const handleMouseOver = () => {
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  const renderDot = () => {
    if (hover || active || buttonHover) {
      return (
        <i
          className="iconfont icon-close webcode-tab-button__close"
          onClick={onClick}
        />
      )
    }
    if (modified) {
      return <i className="webcode-tab-button__dot" />
    }
    return <i className="webcode-tab-button__placeholder" />
  }

  return (
    <a
      className="webcode-tab-button__op"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {renderDot()}
    </a>
  )
}
