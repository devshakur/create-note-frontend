import { LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useLogout } from '../../hooks/useAuth'

interface SidebarFooterProps {
  onNavigate?: () => void
}

const SidebarFooter = ({ onNavigate }: SidebarFooterProps) => {
  const navigate = useNavigate()
  const { logout: clearSession } = useAuth()
  const { logout, error, isLoading } = useLogout()

  const handleLogout = async () => {
    try {
      const response = await logout()
      if (!response) return

      clearSession()
      onNavigate?.()
      navigate('/')
    } catch {
      // The hook exposes the request error below.
    }
  }

  const buttonClasses =
    'flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400'

  return (
    <div className="px-3 pb-4">
      <div className="flex flex-col  justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            navigate('/settings')
          }}
          className={buttonClasses}
        >
          <Settings className="size-4" aria-hidden="true" />
          <span>Settings</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className={`${buttonClasses} hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <LogOut className="size-4" aria-hidden="true" />
          <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-right text-xs text-red-500">{error}</p>
      ) : null}
    </div>
  )
}

export default SidebarFooter
