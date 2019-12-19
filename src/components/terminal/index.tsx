import './index.less'
import 'xterm/css/xterm.css'
import React from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import ansiEscapes from 'ansi-escapes'
import MySocket from '@src/utils/MySocket'

export interface Props {}

export default function XTerminal({}: Props) {
  const refTerminal = React.useRef<HTMLDivElement | null>(null)
  const refTerm = React.useRef<Terminal>()
  const refSocket = React.useRef<MySocket>()

  React.useEffect(() => {
    createTerminal()
    const socket = new MySocket(`ws://localhost:9999`)
    refSocket.current = socket
    socket.onMessage(msg => {
      if (refTerm.current) {
        refTerm.current.write(JSON.parse(msg.data))
      }
    })
  }, [])

  const createTerminal = () => {
    if (refTerminal.current) {
      const term = new Terminal({
        fontSize: 14
      })
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      window.addEventListener('resize', () => {
        fitAddon.fit()
      })
      refTerm.current = term
      term.open(refTerminal.current)
      fitAddon.fit()
      term.onData(e => {
        if (refSocket.current) {
          refSocket.current.send(JSON.stringify(e))
        }
      })

      // term.onKey(({ key }) => {
      //   const keyCode = key.charCodeAt(0)
      //   if (keyCode === 127) {
      //     if (term.buffer.cursorX === 3) {
      //       return
      //     }
      //     term.write('\b \b')
      //     return
      //   }
      //   if (keyCode == 13) {
      //     term.write('\r\n')
      //     term.write(' $ ')
      //     return
      //   }
      //   term.write(key)
      // })
    }
  }

  return (
    <div className="webcode-terminal">
      <div ref={refTerminal} className="webcode-terminal__xterm"></div>
    </div>
  )
}
