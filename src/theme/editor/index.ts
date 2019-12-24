import useTheme from '../useTheme'
import themeCreator, { EDITOR_THEME_NAME } from './creator'

let prevCssText = ''
let $prevStyle: HTMLStyleElement | null = null
const insertCss = (cssText: string) => {
  if (prevCssText === cssText) return
  $prevStyle && $prevStyle.parentElement?.removeChild($prevStyle)
  const $style = document.createElement('style')
  $style.innerHTML = cssText
  $prevStyle = $style
  document.head.appendChild($style)
}

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
