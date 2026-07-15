import { useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

const USER_KEY = 'auth_user'

const readStoredUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(() => readStoredUser())

  const setUser = (next: AuthUser | null) => {
    setUserState(next)
    if (next) {
      localStorage.setItem(USER_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  const setSession = (nextUser: AuthUser) => {
    setUser(nextUser)
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
