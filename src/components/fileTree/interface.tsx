export interface FileTreeFile {
  id: string
  relative: string
  name: string
  children: FileTreeFile[]
  type: 'folder' | 'file'
}

export interface FileTreeFolderProps {
  id: string
  relative: string
  initalOpen?: boolean
  name: string
  level?: number
  files: FileTreeFile[]
  activeFileId: string
  onFileClick?: (id: string, relative: string, type: string) => void
}

export interface FileTreeFileProps {
  id: string
  relative: string
  name: string
  type?: 'folder' | 'folderOpen' | 'file'
  level?: number
  active?: boolean
  onClick?: (id: string, relative: string, type: string) => void
}

export interface RecursionFileProps {
  files: FileTreeFile[]
  level: number
  activeFileId: string
  onFileClick?: (id: string, relative: string, type: string) => void
}

export interface FileTreeProjectProps {
  project: FileTreeFile
  activeFileId: string
  onFileClick?: (id: string, relative: string, type: string) => void
}
