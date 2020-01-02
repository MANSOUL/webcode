import useTheme from '../useTheme'
import insert from '../insertCss'
import themeCreator from './creator'

const insertCss = insert()

export default function useTerminalTheme() {
  const theme = useTheme().theme
  const cssText = themeCreator(theme)
  insertCss(cssText)
}
