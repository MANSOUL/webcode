import React from 'react'
import './index.less'

export interface Props {
  url: string
  type: 'image' | ''
}

export default function FileContainer({ url, type }: Props) {
  return (
    <div className="webcode-file-container">
      {type === 'image' ? (
        <img className="webcode-file-container__image" src={url} />
      ) : null}
    </div>
  )
}
