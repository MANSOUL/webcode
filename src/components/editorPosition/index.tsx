import './index.less'
import React from 'react'
import FootbarItem from '../footbarItem'
import clsx from 'clsx'

export interface Props {
  row: number
  col: number
  selected?: number
  className?: string
}

export default function EditorPosition({
  row,
  col,
  selected = 0,
  className
}: Props) {
  return (
    <FootbarItem className={clsx('webcode-editor-pos', className)}>
      <span className="webcode-editor-pos__item">行 {row}</span>,&nbsp;
      <span className="webcode-editor-pos__item">列 {col}</span>
      {selected > 0 ? (
        <span className="webcode-editor-pos__item">(已选择 {selected})</span>
      ) : null}
    </FootbarItem>
  )
}
