import grammars from './grammars.json'
import { grammerAdapter } from './index'

const getCustomLanguages = () => {
  return grammars.map(item => item.language)
}

export default function overrideLanguage(monaco: any) {
  const overrideLangauges = getCustomLanguages()
  monaco.languages.getLanguages().forEach(function(lang: any) {
    if (overrideLangauges.includes(lang.id)) {
      lang.loader = function() {
        return { then: function() {} }
      }
    }
  })
  // 关闭 json 自带的 token 解析
  monaco.languages.json.jsonDefaults._modeConfiguration.tokens = false
}
