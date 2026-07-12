import { useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/auth'
import { AuthContext } from './auth-context'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
