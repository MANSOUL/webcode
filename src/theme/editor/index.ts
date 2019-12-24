import useTheme from '../useTheme'
import themeCreator, { EDITOR_THEME_NAME } from './creator'
import insert from '../insertCss'

const insertCss = insert()

export const themeConfig = {
  isDark: true,
  cssClass: EDITOR_THEME_NAME,
  cssText: ''
}

export default function useEditorTheme() {
  const theme = useTheme()
  const cssText = themeCreator(theme)
  insertCss(cssText)
}
