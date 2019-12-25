import { Theme, MonacoThemeRule, TokenColor } from '../interface'

const mapScope = (scopes: string[], color: TokenColor) => {
  return scopes.map((scope: string) => ({
    ...color.settings,
    token: scope
  }))
}

export default function convertTheme(theme: Theme) {
  let monacoThemeRule: MonacoThemeRule[] = []
  theme.tokenColors.map(function(color) {
    if (typeof color.scope == 'string') {
      var split = color.scope.split(',')
      if (split.length > 1) {
        color.scope = split
        monacoThemeRule = [...monacoThemeRule, ...mapScope(split, color)]
        return
      }
      monacoThemeRule.push({ ...color.settings, token: color.scope })
    } else {
      monacoThemeRule = [...monacoThemeRule, ...mapScope(color.scope, color)]
    }
  })
  return {
    inherit: true,
    base: 'vs-dark',
    colors: theme.colors,
    rules: monacoThemeRule,
    encodedTokensColors: []
  }
}
