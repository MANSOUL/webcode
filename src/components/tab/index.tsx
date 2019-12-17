import './index.less'
import React from 'react'
import FileIcon from '../fileIcon'
import clsx from 'clsx'

export interface Props {
  tabs?: []
}

export interface TabItemProps {
  fileName: string
  modified: boolean
  filePath: string
  active?: boolean
}

export interface DotProps {
  modified?: boolean
  onClick?: () => void
}

function Dot({ modified = true, onClick }: DotProps) {
  const [hover, setHover] = React.useState(false)

  const handleMouseOver = () => {
    console.log('over')
    setHover(true)
  }

  const handleMouseOut = () => {
    console.log('out')
    setHover(false)
  }

  return (
    <a
      className="webcode-tab-item__op"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {!modified || hover ? (
        <i
          className="iconfont icon-close webcode-tab-item__close"
          onClick={onClick}
        />
      ) : (
        <i className="webcode-tab-item__dot" />
      )}
    </a>
  )
}

export function TabItem({
  fileName,
  modified,
  filePath,
  active = true
}: TabItemProps) {
  return (
    <div
      className={clsx('webcode-tab-item', {
        'webcode-tab-item--active': active
      })}
    >
      <FileIcon type="file" fileName={fileName} />
      <span className="webcode-tab-item__name">{fileName}</span>
      <Dot modified={modified} />
    </div>
  )
}

export default function Tab({ tabs }: Props) {
  return (
    <div className="webcode-tab">
      <TabItem fileName="a.js" modified={true} filePath="a.js" />
    </div>
  )
}
