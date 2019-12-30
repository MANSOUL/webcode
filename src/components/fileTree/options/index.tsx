import './index.less'
import React from 'react'
import { ReactSVG } from 'react-svg'
import svgAddFile from '@src/aseets/svg/add-file-1.svg'
import svgAddFolder from '@src/aseets/svg/add-folder.svg'
import svgRename from '@src/aseets/svg/edit-file-v2.svg'
import svgUpdate from '@src/aseets/svg/available-updates.svg'

interface SvgProps {
  src: string
}

function Svg({ src }: SvgProps) {
  return (
    <ReactSVG
      src={src}
      afterInjection={(error, svg) => {
        if (error) {
          console.error(error)
          return
        }
        console.log(svg)
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
      onClick={() => {
        console.log('wrapper onClick')
      }}
    />
  )
}

export default function Options() {
  return (
    <div className="webcode-filetree-options">
      <Svg src={svgRename} />
      <Svg src={svgAddFile} />
      <Svg src={svgAddFolder} />
      <Svg src={svgUpdate} />
    </div>
  )
}
