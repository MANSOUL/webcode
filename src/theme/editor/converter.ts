import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'

const languages = [
  {
    id: 'cpp',
    url: '/assets/grammers/cpp.tmLanguage.json',
    mapTo: 'source.cpp'
  },
  {
    id: 'javascript',
    url: '/assets/grammers/javascript.tmLanguage.json',
    mapTo: 'source.js'
  }
]

function createRegister(url: string) {
  const registry = new Registry({
    getGrammarDefinition: async scopeName => {
      return {
        format: 'json',
        content: await (await fetch(url)).text()
      }
    }
  })
  return registry
}

async function liftOff(
  monaco: any,
  registry: Registry,
  languageId: string,
  mapTo: string
) {
  // map of monaco "language id's" to TextMate scopeNames
  const grammers = new Map()
  grammers.set(languageId, mapTo)
  await wireTmGrammars(monaco, registry, grammers)
}

export default async function wireLanguage(monaco: any) {
  for (let i = 0; i < languages.length; i++) {
    const language = languages[i]
    const register = createRegister(language.url)
    await liftOff(monaco, register, language.id, language.mapTo)
  }
}
