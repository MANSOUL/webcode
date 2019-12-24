import useTheme from '../useTheme'
import insert from '../insertCss'
import themeCreator from './creator'

const insertCss = insert()

export default function useEditorTheme() {
  const theme = useTheme()
  const cssText = themeCreator(theme)
  insertCss(cssText)
}
