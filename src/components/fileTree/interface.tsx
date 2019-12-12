export interface FileTreeFile {
  id: string
  name: string
  children: FileTreeFile[]
  type: 'folder' | 'file'
}

export interface FileTreeFolderProps {
  initalOpen?: boolean
  name: string
  level?: number
  files: FileTreeFile[]
}

export interface FileTreeFileProps {
  name: string
  type?: 'folder' | 'folderOpen' | 'file'
  level?: number
  active?: boolean
  onClick?: () => void
}

export interface FileTreeProjectProps {
  project: FileTreeFile
}
