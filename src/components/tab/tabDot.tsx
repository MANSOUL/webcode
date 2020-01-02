import React from 'react'
import { TabDotProps } from './interface'
import { ReactSVG } from 'react-svg'
import svgClose from '@src/aseets/svg/close.svg'

export default function TabDot({
  modified = false,
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

  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e)
    // fix: 点击之后弹出浮层，导致mouseout事件不触发
    handleMouseOut()
  }

  const renderDot = () => {
    // 移动到点上
    //或 当前不是编辑的tab但是鼠标在button上并且还是没有编辑过的tab
    //或 当前是编辑tab但是没有编辑过
    if (
      hover ||
      (!active && buttonHover && !modified) ||
      (active && !modified)
    ) {
      return (
        <ReactSVG
          src={svgClose}
          beforeInjection={svg => {
            svg.classList.add('webcode-tab-button__svg')
          }}
          wrapper="div"
          className="webcode-tab-button__close"
          onClick={handleClick}
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
