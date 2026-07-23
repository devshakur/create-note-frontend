import api from '../api/axios'
import { ENDPOINTS } from '../api/endpoint'
import type {
  AuthResponse,
  LoginPayload,
  LogoutResponse,
  RegisterPayload,
} from '../types/auth'

const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.LOGIN, payload)
    return response.data
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(ENDPOINTS.REGISTER, payload)
    return response.data
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>(ENDPOINTS.LOGOUT)
    return response.data
  },
}

export default authService
