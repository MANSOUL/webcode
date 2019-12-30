import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import grammars from './grammars.json'

interface Grammer {
  language: string
  path: string
  scopeName: string
}

function getGrammarByScopeName(grammars: Grammer[], scopeName: string) {
  return grammars.find(g => g.scopeName === scopeName)
}

function createRegister() {
  const registry = new Registry({
    getGrammarDefinition: async scopeName => {
      const grammar = getGrammarByScopeName(grammars, scopeName)
      if (grammar) {
        return {
          format: 'json',
          content: await (await fetch(grammar.path)).text()
        }
      }
      return {
        format: 'json',
        content: await (await fetch(grammars[1].path)).text()
      }
    }
  })
  return registry
}

export default async function wireLanguage(monaco: any, editor?: any) {
  // map of monaco "language id's" to TextMate scopeNames
  const languages = new Map()
  grammars.forEach(item => languages.set(item.language, item.scopeName))
  await wireTmGrammars(monaco, createRegister(), languages, editor)
}
