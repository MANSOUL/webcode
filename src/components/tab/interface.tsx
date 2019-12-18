export interface TabProps {
  tabs?: []
}

export interface TabButtonProps {
  fileName: string
  modified: boolean
  filePath: string
  active?: boolean
  onClick?: () => void
}

export interface TabDotProps {
  modified?: boolean
  onClick?: () => void
}

export interface TabItemProps {
  tab: number
  activeTab: number
  children: any
}
