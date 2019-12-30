import monaco from 'monaco-editor'

const getExtension = (file: string) => {
  return '.' + file.split('.').slice(-1)[0]
}

export default function getLanguageId(file: string, languages: any[]) {
  const extension = getExtension(file)
  const language = languages.find(item => item.extensions.includes(extension))
  return 'm' + (language?.id || '')
}
