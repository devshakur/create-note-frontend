export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  status: 'success' | 'error'
  data: AuthUser
  token?: string
}
