import './index.less'
import React from 'react'

export interface Props {
  row: number
  col: number
  selected?: number
}

export default function EditorPosition({ row, col, selected = 0 }: Props) {
  return (
    <div className="webcode-editor-pos">
      <span className="webcode-editor-pos__item">行 {row}</span>,&nbsp;
      <span className="webcode-editor-pos__item">列 {col}</span>
      {selected > 0 ? (
        <span className="webcode-editor-pos__item">(已选择 {selected})</span>
      ) : null}
    </div>
  )
}
