import { Theme } from '../interface'
import getTokenCss from './getTokenSetting'

export const EDITOR_THEME_NAME = 'ace-webcode'
export const EDITOR_THEME_CSS_NAME = `.${EDITOR_THEME_NAME}`
const isDark = true

export default function themeCreator(theme: Theme) {
  const { colors, tokenColors } = theme
  return `
  ${EDITOR_THEME_CSS_NAME} {
    background-color: ${colors['editor.background']};
    color: ${colors['editor.foreground']}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_gutter {
    background: ${colors['editor.background']};
    color: ${colors['editorLineNumber.foreground']};
  }

  /** scroll bar **/
  ::-webkit-scrollbar {
    background-color: ${colors['editor.background']};
  }
  ::-webkit-scrollbar-thumb
  {
    background-color: rgba(255,255,255,.1);
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255,255,255,.3);
  }
  /** firefox **/
  ${EDITOR_THEME_CSS_NAME} .ace_scrollbar {
    scrollbar-color: rgba(255,255,255,.1) ${colors['editor.background']};
    cursor: pointer;
  }
  ${EDITOR_THEME_CSS_NAME} .ace_scrollbar:hover {
    scrollbar-color: rgba(255,255,255,.3) ${colors['editor.background']};
  }

  ${EDITOR_THEME_CSS_NAME} .ace_print-margin {
    width: 1px;
    background: #555651
  }
  ${EDITOR_THEME_CSS_NAME} .ace_cursor {
    color: ${colors['editorCursor.foreground']}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_selection {
    background: ${colors['editor.selectionBackground']};
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
  /** 编辑器当前行 **/
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_active-line {
    background-color: ${colors['editor.lineHighlightBackground']};
  }
  /** 行数当前行 **/
  ${EDITOR_THEME_CSS_NAME} .ace_gutter-active-line {
    background-color: ${colors['editor.lineHighlightBackground']};
  }
  /** 当前行选中文本的遮罩 **/
  ${EDITOR_THEME_CSS_NAME} .ace_marker-layer .ace_selected-word {
    border: 1px solid #49483E;
  }
  ${EDITOR_THEME_CSS_NAME} .ace_invisible {
    color: #52524d
  }
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_name.ace_tag,
  ${EDITOR_THEME_CSS_NAME} .ace_keyword,
  ${EDITOR_THEME_CSS_NAME} .ace_storage {
    ${getTokenCss(tokenColors, 'keyword')}
  }
  /** 标签名 **/
  ${EDITOR_THEME_CSS_NAME} .ace_xml-pe.ace_xml.ace_doctype,
  ${EDITOR_THEME_CSS_NAME} .ace_meta.ace_tag {
    ${getTokenCss(tokenColors, 'punctuation.definition.tag')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_punctuation {
    /** ${getTokenCss(tokenColors, 'string.template')} **/
  }
  ${EDITOR_THEME_CSS_NAME} .ace_operator {
    ${getTokenCss(tokenColors, 'punctuation.separator')}
  }
  /** <> **/
  ${EDITOR_THEME_CSS_NAME} .ace_punctuation.ace_tag {
    ${getTokenCss(tokenColors, 'punctuation.definition.tag')}
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

  ${EDITOR_THEME_CSS_NAME} .ace_xml-pe.ace_xml,
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_name.ace_function,
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_other,
  ${EDITOR_THEME_CSS_NAME} .ace_entity.ace_other.ace_attribute-name{
    ${getTokenCss(tokenColors, 'punctuation.definition.list')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_variable {
    ${getTokenCss(tokenColors, 'variable')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_variable.ace_parameter {
    ${getTokenCss(tokenColors, 'variable.parameter')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_string {
    ${getTokenCss(tokenColors, 'string.quoted')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_comment {
    ${getTokenCss(tokenColors, 'comment')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_name.ace_function {
    ${getTokenCss(tokenColors, 'entity.name.function')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_identifier {
    ${getTokenCss(tokenColors, 'entity.name.tag')}
  }
  ${EDITOR_THEME_CSS_NAME} .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y
  }
`
}
