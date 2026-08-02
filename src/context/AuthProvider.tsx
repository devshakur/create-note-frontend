import { useEffect, useState, type ReactNode } from 'react'
import { queryClient } from '../api/queryClient'
import { profileKeys } from '../hooks/profileKeys'
import { profileQueryOptions } from '../hooks/profileQueryOptions'
import type { AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

const LEGACY_USER_KEY = 'auth_user'

const clearAuthenticatedCache = () => {
  queryClient.clear()
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    localStorage.removeItem(LEGACY_USER_KEY)

    let cancelled = false

    const bootstrap = async () => {
      try {
        const profile = await queryClient.fetchQuery(profileQueryOptions)
        if (!cancelled) setUserState(profile)
      } catch {
        if (!cancelled) {
          setUserState(null)
          clearAuthenticatedCache()
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void bootstrap()

    return () => {
      cancelled = true
    }
  }, [])

  const setUser = (next: AuthUser | null) => {
    if (!next) {
      clearAuthenticatedCache()
      setUserState(null)
      return
    }

    setUserState(next)
    queryClient.setQueryData(profileKeys.me(), next)
  }

  const setSession = (nextUser: AuthUser) => {
    // Drop any previous account's cached notes/profile before binding the new user.
    clearAuthenticatedCache()
    setUserState(nextUser)
    queryClient.setQueryData(profileKeys.me(), nextUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setSession,
        logout,
        isAuthenticated: user !== null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
