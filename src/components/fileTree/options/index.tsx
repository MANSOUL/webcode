import './index.less'
import React from 'react'
import { ReactSVG } from 'react-svg'
import svgAddFile from '@src/aseets/svg/add-file-1.svg'
import svgAddFolder from '@src/aseets/svg/add-folder.svg'
import svgRename from '@src/aseets/svg/edit-file-v2.svg'
import svgUpdate from '@src/aseets/svg/available-updates.svg'
import svgDownload from '@src/aseets/svg/downloads-folder.svg'

interface SvgProps {
  src: string
  onClick?: () => void
}

function Svg({ src, onClick }: SvgProps) {
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
      wrapper="div"
      className="webcode-filetree-options__icon"
      onClick={onClick}
    />
  )
}

export interface Props {
  download?: boolean
  rename?: boolean
  addFile?: boolean
  addFolder?: boolean
  update?: boolean
  onDownload?: () => void
  onRename?: () => void
  onAddFile?: () => void
  onAddFolder?: () => void
  onUpdate?: () => void
}

export default function Options({
  download = false,
  rename = false,
  addFile = true,
  addFolder = true,
  update = false,
  onDownload,
  onRename,
  onAddFile,
  onAddFolder,
  onUpdate
}: Props) {
  return (
    <div className="webcode-filetree-options">
      {download ? <Svg src={svgDownload} onClick={onDownload} /> : null}
      {rename ? <Svg src={svgRename} onClick={onRename} /> : null}
      {addFile ? <Svg src={svgAddFile} onClick={onAddFile} /> : null}
      {addFolder ? <Svg src={svgAddFolder} onClick={onAddFolder} /> : null}
      {update ? <Svg src={svgUpdate} onClick={onUpdate} /> : null}
    </div>
  )
}
