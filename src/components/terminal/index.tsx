import './index.less'
import 'xterm/css/xterm.css'
import React from 'react'
import { Terminal } from 'xterm'

export interface Props {}

export default function XTerminal({}: Props) {
  const refTerminal = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    createTerminal()
  }, [])

  const createTerminal = () => {
    if (refTerminal.current) {
      const term = new Terminal()
      term.open(refTerminal.current)
      term.write('$ ')
      term.onKey(({ key }) => {
        if (key.charCodeAt(0) == 13) {
          term.write('\r\n')
          term.write('$ ')
        }
        term.write(key)
      })
    }
  }

  return (
    <div className="webcode-terminal">
      <div ref={refTerminal} className="webcode-terminal__xterm"></div>
    </div>
  )
}
