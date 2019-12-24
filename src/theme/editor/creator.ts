import { Theme } from '../interface'
import getTokenCss from './getTokenSetting'

export const EDITOR_THEME_NAME = 'ace-webcode'
export const EDITOR_THEME_CSS_NAME = `.${EDITOR_THEME_NAME}`
const isDark = true

export default function themeCreator(theme: Theme) {
  const tokenColors = theme.tokenColors
  return `
  ${EDITOR_THEME_CSS_NAME} {
    background-color: ${theme.colors['editor.background']};
    color: ${theme.colors['editor.foreground']}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_gutter {
    background: ${theme.colors['editor.background']}
    color: ${theme.colors['editorLineNumber.foreground']}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_print-margin {
    width: 1px;
    background: #555651
  }
  ${EDITOR_THEME_CSS_NAME} .ace_cursor {
    color: ${theme.colors['editorCursor.foreground']}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_selection {
    background: #49483E
  }
  ${EDITOR_THEME_CSS_NAME}.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #272822;
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_step {
    background: rgb(102, 82, 0)
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #49483E
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_active-line {
    background: #202020
  }
  ${EDITOR_THEME_CSS_NAME} .ace_gutter-active-line {
    background-color: #272727
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_selected-word {
    border: 1px solid #49483E
  }
  ${EDITOR_THEME_CSS_NAME} .ace_invisible {
    color: #52524d
  }
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_EDITOR_THEME_CSS_NAME.ace_tag,
  ${EDITOR_THEME_CSS_NAME} .ace_keyword,
  ${EDITOR_THEME_CSS_NAME} .ace_meta.ace_tag,
  ${EDITOR_THEME_CSS_NAME} .ace_storage {
    ${getTokenCss(tokenColors, 'keyword')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_punctuation,
  ${EDITOR_THEME_CSS_NAME} .ace_punctuation.ace_tag {
    color: #fff
  }
  ${EDITOR_THEME_CSS_NAME} .ace_constant.ace_character,
  ${EDITOR_THEME_CSS_NAME} .ace_constant.ace_language,
  ${EDITOR_THEME_CSS_NAME} .ace_constant.ace_numeric,
  ${EDITOR_THEME_CSS_NAME} .ace_constant.ace_other {
    color: #AE81FF
  }
  ${EDITOR_THEME_CSS_NAME} .ace_invalid {
    color: #F8F8F0;
    background-color: #F92672
  }
  ${EDITOR_THEME_CSS_NAME} .ace_invalid.ace_deprecated {
    color: #F8F8F0;
    background-color: #AE81FF
  }
  ${EDITOR_THEME_CSS_NAME} .ace_support.ace_constant,
  ${EDITOR_THEME_CSS_NAME} .ace_support.ace_function {
    color: #66D9EF
  }
  ${EDITOR_THEME_CSS_NAME} .ace_fold {
    background-color: #A6E22E;
    border-color: #F8F8F2
  }
  ${EDITOR_THEME_CSS_NAME} .ace_storage.ace_type {
    ${getTokenCss(tokenColors, 'keyword')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_support.ace_class,
  ${EDITOR_THEME_CSS_NAME} .ace_support.ace_type {
    font-style: italic;
    color: #66D9EF
  }
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_EDITOR_THEME_CSS_NAME.ace_function,
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_other,
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_other.ace_attribute-EDITOR_THEME_CSS_NAME,
  ${EDITOR_THEME_CSS_NAME} .ace_variable {
    color: #A6E22E
  }
  ${EDITOR_THEME_CSS_NAME} .ace_variable.ace_parameter {
    font-style: italic;
    color: #FD971F
  }
  ${EDITOR_THEME_CSS_NAME} .ace_string {
    color: #E6DB74
  }
  ${EDITOR_THEME_CSS_NAME} .ace_comment {
    ${getTokenCss(tokenColors, 'comment')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y
  }
`
}
