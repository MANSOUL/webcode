import { cloneDeep } from 'lodash'
import hash from 'hash.js'

export const createNewFile = (
  fileStructure: any,
  newFile: any,
  type: 'file' | 'folder' = 'file'
) => {
  const file = cloneDeep(fileStructure)
  const { relative, fileName, content } = newFile
  const folder = findFolder(file, relative)

  folder.children.push({
    id: hash
      .sha256()
      .update(`${relative}/${fileName}`)
      .digest('hex'),
    relative: `${relative}/${fileName}`,
    name: fileName,
    children: [],
    type
  })

  folder.children.sort((a: any, b: any) => {
    if (a.type !== b.type && (a.type === 'folder' || b.type === 'folder')) {
      return 1
    }
    return 0
  })

  return file
}

const findFolder = (folder: any, relative: string): any => {
  if (folder.relative === relative) {
    return folder
  }
  for (let i = 0; i < folder.children.length; i++) {
    const element = folder.children[i]
    if (element.type === 'folder' && element.relative === relative) {
      return element
    } else if (element.type === 'folder') {
      return findFolder(element, relative)
    }
  }
}
