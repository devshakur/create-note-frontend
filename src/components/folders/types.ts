export interface FolderCardData {
  id: string
  name: string
  initials?: string
}

export interface FolderCardProps {
  folder: FolderCardData
  onClick?: (folderId: string) => void
}

export interface FolderCardListProps {
  folders?: FolderCardData[]
  onFolderClick?: (folderId: string) => void
}
