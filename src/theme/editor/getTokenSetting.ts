import { TokenColor } from '../interface'
import { paramCase } from 'param-case'

export function getTokenSetting(
  tokenColors: TokenColor[],
  identityScope: string
) {
  const tokenColor = tokenColors.find((item: TokenColor) => {
    let scope = item.scope
    if (typeof scope === 'string') {
      scope = [scope]
    }
    if (scope.includes(identityScope)) {
      return true
    }
    return false
  })
  return tokenColor?.settings
}

export default function getTokenCss(
  tokenColors: TokenColor[],
  identityScope: string
) {
  const settings = getTokenSetting(tokenColors, identityScope)
  let returnSettings: Record<string, string | undefined> = {}
  if (settings) {
    returnSettings = {
      fontStyle: settings.fontStyle,
      color: settings.foreground
    }
  }
  const css = Object.keys(returnSettings).map(
    key => `${paramCase(key)}: ${returnSettings[key]};`
  )
  return css.join('')
}
