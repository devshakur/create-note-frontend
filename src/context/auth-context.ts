import { createContext } from 'react'
import type { AuthUser } from '../types/auth'

export interface AuthContextValue {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  setSession: (user: AuthUser) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)
