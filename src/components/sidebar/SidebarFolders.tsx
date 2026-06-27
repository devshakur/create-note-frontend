import { useId, useState } from 'react'
import { ChevronUp, Folder, Plus } from 'lucide-react'

import { SIDEBAR_FOLDERS } from './constants'

interface SidebarFoldersProps {
  onNavigate?: () => void
}

const SidebarFolders = ({ onNavigate }: SidebarFoldersProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const folderListId = useId()

  return (
    <section aria-labelledby="sidebar-folders-heading" className="px-3">
      <div className="flex items-center gap-1 rounded-lg bg-neutral-200/50 px-2 py-2">
        <Folder className="size-4 shrink-0 text-neutral-700" aria-hidden="true" />
        <h2
          id="sidebar-folders-heading"
          className="flex-1 text-sm font-semibold text-neutral-800"
        >
          Folders
        </h2>

        <button
          type="button"
          className="rounded-md p-1 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          aria-label="Add folder"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="rounded-md p-1 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          aria-expanded={isExpanded}
          aria-controls={folderListId}
          aria-label={isExpanded ? 'Collapse folders' : 'Expand folders'}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <ChevronUp
            className={`size-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isExpanded ? (
        <ul id={folderListId} className="mt-2 flex list-none flex-col gap-1 p-0 pl-2">
          {SIDEBAR_FOLDERS.map((folder) => (
            <li key={folder.id}>
              <button
                type="button"
                onClick={onNavigate}
                className="w-full rounded-md px-2 py-1.5 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
              >
                {folder.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default SidebarFolders
