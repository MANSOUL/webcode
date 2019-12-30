import getExtension from '@src/utils/getExtension'

export default function getLanguageId(file: string, languages: any[]) {
  const extension = getExtension(file)
  const language = languages.find(item => item.extensions.includes(extension))
  return 'm-' + (language?.id || '')
}
