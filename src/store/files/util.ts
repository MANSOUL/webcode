import { FileContent } from '.'
import isImage from 'is-image'

export const getFileById = (files: FileContent[], id: string) => {
  return files.find(item => item.id === id)
}

export const getFileIndex = (files: FileContent[], id: string) => {
  return files.findIndex(item => item.id === id)
}

export const getUnsavedFileCount = (files: FileContent[]) => {
  return files.reduce(
    (prev: number, current: FileContent) =>
      current.modified ? prev + 1 : prev,
    0
  )
}

export const getRequestType = (file: string) => {
  return isImage(file) ? 'image' : 'text'
}
