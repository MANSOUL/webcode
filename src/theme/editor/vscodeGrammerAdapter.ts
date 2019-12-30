import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import grammars from './grammars.json'
import getExtension from '@src/utils/getExtension'

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
      let grammar = getGrammarByScopeName(grammars, scopeName)
      grammar = grammar || grammars[0]
      const path = grammar.path
      return {
        format: getExtension(path) === '.json' ? 'json' : 'plist',
        content: await (await fetch(grammar.path)).text()
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
