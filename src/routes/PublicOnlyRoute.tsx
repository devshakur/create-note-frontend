import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

/**
 * For public auth pages (login/register).
 * Authenticated users are redirected to the default app page.
 */
const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f3f3f3]">
        <p className="text-sm text-neutral-500">Loading...</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PublicOnlyRoute
