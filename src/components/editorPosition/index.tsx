import './index.less'
import React from 'react'

export interface Props {
  row: number
  col: number
}

export default function EditorPosition({ row, col }: Props) {
  return (
    <div className="webcode-editor-pos">
      <span className="webcode-editor-pos__item">行 {row}</span>,&nbsp;
      <span className="webcode-editor-pos__item">列 {col}</span>
    </div>
  )
}
