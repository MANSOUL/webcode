import { FileContent } from '.'

export const getFileById = (files: FileContent[], id: string) => {
  return files.find(item => item.id === id)
}

export const getFileIndex = (files: FileContent[], id: string) => {
  return files.findIndex(item => item.id === id)
}
