import './index.less'
import React from 'react'
import { ReactSVG } from 'react-svg'
import svgAddFile from '@src/aseets/svg/add-file-1.svg'
import svgAddFolder from '@src/aseets/svg/add-folder.svg'
import svgRename from '@src/aseets/svg/edit-file-v2.svg'
import svgUpdate from '@src/aseets/svg/available-updates.svg'
import svgDownload from '@src/aseets/svg/downloads-folder.svg'
import svgTrash from '@src/aseets/svg/trash.svg'

interface SvgProps {
  src: string
  onClick?: () => void
}

function Svg({ src, onClick }: SvgProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick && onClick()
  }
  return (
    <ReactSVG
      src={src}
      afterInjection={(error, svg) => {
        if (error) {
          console.error(error)
          return
        }
      }}
      beforeInjection={svg => {
        svg.classList.add('webcode-filetree-options__svg')
      }}
      evalScripts="always"
      fallback={() => <span>Error!</span>}
      loading={() => <span>Loading</span>}
      renumerateIRIElements={false}
      wrapper="span"
      className="webcode-filetree-options__icon"
      onClick={handleClick}
    />
  )
}

export interface Props {
  download?: boolean
  rename?: boolean
  addFile?: boolean
  addFolder?: boolean
  update?: boolean
  trash?: boolean
  onDownload?: () => void
  onRename?: () => void
  onAddFile?: () => void
  onAddFolder?: () => void
  onUpdate?: () => void
  onTrash?: () => void
}

export default function Options({
  download = false,
  rename = false,
  addFile = true,
  addFolder = true,
  update = false,
  trash = true,
  onDownload,
  onRename,
  onAddFile,
  onAddFolder,
  onUpdate,
  onTrash
}: Props) {
  return (
    <div className="webcode-filetree-options">
      {download ? <Svg src={svgDownload} onClick={onDownload} /> : null}
      {rename ? <Svg src={svgRename} onClick={onRename} /> : null}
      {addFile ? <Svg src={svgAddFile} onClick={onAddFile} /> : null}
      {addFolder ? <Svg src={svgAddFolder} onClick={onAddFolder} /> : null}
      {update ? <Svg src={svgUpdate} onClick={onUpdate} /> : null}
      {trash ? <Svg src={svgTrash} onClick={onTrash} /> : null}
    </div>
  )
}
