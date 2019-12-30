import grammars from './grammars.json'

export default function registerLanguage(monaco: any) {
  grammars.forEach(
    item => item.language && monaco.languages.register({ id: item.language })
  )
}
