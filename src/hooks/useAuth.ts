import { isAxiosError } from 'axios'
import { useRef, useState } from 'react'
import authService from '../services/auth.service'
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '../types/auth'

const getErrorMessage = (err: unknown, fallback: string) => {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    return data?.message ?? err.message
  }
  if (err instanceof Error) return err.message
  return fallback
}

export const useLogin = () => {
  const [data, setData] = useState<AuthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inFlightRef = useRef(false)

  const login = async (payload: LoginPayload) => {
    if (inFlightRef.current) return

    inFlightRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.login(payload)
      setData(response)
      return response
    } catch (err) {
      const message = getErrorMessage(err, 'Login failed')
      setError(message)
      throw err
    } finally {
      inFlightRef.current = false
      setIsLoading(false)
    }
  }

  return { login, data, error, isLoading }
}

export const useRegister = () => {
  const [data, setData] = useState<AuthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inFlightRef = useRef(false)

  const register = async (payload: RegisterPayload) => {
    if (inFlightRef.current) return

    inFlightRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.register(payload)
      setData(response)
      return response
    } catch (err) {
      const message = getErrorMessage(err, 'Registration failed')
      setError(message)
      throw err
    } finally {
      inFlightRef.current = false
      setIsLoading(false)
    }
  }

  return { register, data, error, isLoading }
}
