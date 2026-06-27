import FolderIcon from './FolderIcon'
import { getFolderInitials } from './utils'
import type { FolderCardProps } from './types'

const FolderCard = ({ folder, onClick }: FolderCardProps) => {
  const initials = folder.initials ?? getFolderInitials(folder.name)

  return (
    <button
      type="button"
      onClick={() => onClick?.(folder.id)}
      className="flex w-full shrink-0 flex-col items-center gap-2 rounded-lg p-1 transition-colors hover:bg-neutral-200/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      aria-label={`Open ${folder.name} folder`}
    >
      <FolderIcon initials={initials} />
      <span className="w-full truncate text-center text-sm text-neutral-500">
        {folder.name}
      </span>
    </button>
  )
}

export default FolderCard
