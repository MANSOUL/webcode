import { Theme, MonacoThemeRule, TokenColor } from '../interface'

const getBase = (type: string) => {
  if (type === 'dark') {
    return 'vs-dark'
  }

  if (type === 'hc') {
    return 'hc-black'
  }

  return 'vs'
}

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
  // 设置 minimap 和 scrollbar 等非代码控件颜色
  monacoThemeRule.push({
    token: '',
    background: theme.colors['editor.background']
  })
  return {
    inherit: true,
    base: getBase(theme.type),
    colors: theme.colors,
    rules: monacoThemeRule,
    encodedTokensColors: []
  }
}
