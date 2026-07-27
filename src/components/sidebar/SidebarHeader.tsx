import { ChevronsUpDown } from 'lucide-react'

import { useAuth } from '../../context/useAuth'
import UserAvatar from '../ui/UserAvatar'
import { SIDEBAR_APP_NAME } from './constants'

const SidebarHeader = () => {
  const { user } = useAuth()
  const userName = user?.name ?? 'Guest'

  return (
    <div className="flex items-center gap-3 px-3 py-4">
      <UserAvatar
        name={userName}
        profilePicture={user?.profilePicture}
      />

      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-sm font-semibold text-neutral-900">
          {SIDEBAR_APP_NAME}
        </p>
        <p className="truncate text-xs text-neutral-500">{userName}</p>
      </div>

      <button
        type="button"
        className="rounded-md p-1 text-neutral-500 transition-colors hover:bg-neutral-200/70 hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
        aria-label="Switch workspace"
      >
        <ChevronsUpDown className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SidebarHeader
