export interface TabProps {
  children: any
  onTabChange: (index: number) => void
}

export interface TabSwicherProps {
  children: any
  className?: string
}

export interface TabContainerProps {
  children: any
  className?: string
}

export interface TabButtonProps {
  fileName: string
  modified: boolean
  filePath: string
  active?: boolean
  onClick?: () => void
  onClose?: () => void
}

export interface TabDotProps {
  modified?: boolean
  active?: boolean
  buttonHover?: boolean
  onClick?: (event: React.MouseEvent) => void
}

export interface TabItemProps {
  tab: number
  activeTab: number
  children: any
}
