import './index.less'
import 'xterm/css/xterm.css'
import React from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import MySocket from '@src/utils/MySocket'
import useTheme from '@src/theme/useTheme'
import { createStyles } from '@src/theme'
import clsx from 'clsx'
import useTerminalTheme from '@src/theme/terminal'
import { useSelector } from 'react-redux'
import { AppStore } from '@src/store'
import { TERMINAL_SOCKET_URL } from '@src/config/project'

const useStyles = createStyles(theme => ({
  terminal: {
    backgroundColor:
      theme.colors['terminal.background'] || theme.colors['panel.background']
  }
}))

export interface Props {}

export default function XTerminal({}: Props) {
  const refTerminal = React.useRef<HTMLDivElement | null>(null)
  const refTerm = React.useRef<Terminal>()
  const refSocket = React.useRef<MySocket>()
  const refFit = React.useRef<FitAddon | null>(null)
  const editor = useSelector((store: AppStore) => store.editor)
  const theme = useTheme()
  const classes = useStyles()
  useTerminalTheme()

  React.useEffect(() => {
    createTerminal()
    const socket = new MySocket(TERMINAL_SOCKET_URL)
    refSocket.current = socket
    socket.onMessage(msg => {
      if (refTerm.current) {
        refTerm.current.write(JSON.parse(msg.data))
      }
    })
    return () => {
      socket.close(true)
    }
  }, [])

  // 重新设置theme
  React.useEffect(() => {
    setTermTheme()
  }, [theme.name])

  // fit
  React.useEffect(() => {
    refFit.current && refFit.current.fit()
  }, [editor.resizeCount])

  const setTermTheme = () => {
    if (refTerm.current) {
      refTerm.current.setOption('theme', {
        background:
          theme.colors['terminal.background'] ||
          theme.colors['panel.background'],
        foreground: theme.colors['terminal.foreground'],
        black: theme.colors['terminal.ansiBlack'] || '#333333',
        blue: theme.colors['terminal.ansiBlue'],
        brightBlue: theme.colors['terminal.ansiBrightBlue'],
        brightCyan: theme.colors['terminal.ansiBrightCyan'],
        brightGreen: theme.colors['terminal.ansiBrightGreen'],
        brightMagenta: theme.colors['terminal.ansiBrightMagenta'],
        brightRed: theme.colors['terminal.ansiBrightRed'],
        brightYellow: theme.colors['terminal.ansiBrightYellow'],
        cyan: theme.colors['terminal.ansiCyan'],
        green: theme.colors['terminal.ansiGreen'],
        magenta: theme.colors['terminal.ansiMagenta'],
        red: theme.colors['terminal.ansiRed'],
        yellow: theme.colors['terminal.ansiYellow'],
        cursor: theme.colors['terminalCursor.foreground'],
        selection: theme.colors['terminal.selectionBackground']
      })
    }
  }

  const createTerminal = () => {
    if (refTerminal.current) {
      const term = new Terminal({
        fontSize: 14
      })
      refTerm.current = term
      const fitAddon = new FitAddon()
      refFit.current = fitAddon
      term.loadAddon(fitAddon)
      setTermTheme()
      term.open(refTerminal.current)
      fitAddon.fit()
      term.onData(e => {
        if (refSocket.current) {
          refSocket.current.send(JSON.stringify(e))
        }
      })
    }
  }

  return (
    <div className={clsx('webcode-terminal', classes.terminal)}>
      <div ref={refTerminal} className="webcode-terminal__xterm"></div>
    </div>
  )
}
