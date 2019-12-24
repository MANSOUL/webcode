import { Theme } from '../interface'

const TERMINAL_CLASS_NAME = '.webcode-terminal__xterm'

export default function themeCreator(theme: Theme) {
  const { colors } = theme
  return `
    ::-webkit-scrollbar {
      background-color: ${colors['terminal.background']};
    }
    ::-webkit-scrollbar-thumb
    {
      background-color: rgba(255,255,255,.1);
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255,255,255,.3);
    }
    ${TERMINAL_CLASS_NAME} .xterm-viewport {
      scrollbar-color: rgba(255,255,255,.1) ${colors['editor.background']};
    }
    ${TERMINAL_CLASS_NAME} .xterm-viewport:hover {
      scrollbar-color: rgba(255,255,255,.3) ${colors['editor.background']};
    }
  `
}
