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
  username?: string
  profilePicture?: string | null
}

export interface AuthResponse {
  status: 'success' | 'error'
  data: AuthUser
  token?: string
}

export interface LogoutResponse {
  status: 'success' | 'error'
  message?: string
}

export interface ProfileResponse {
  status: 'success' | 'error' | 'fail'
  data: AuthUser
  message?: string
}

export interface UpdateProfilePayload {
  name?: string
  username?: string
  email?: string
}

export interface UploadProfilePictureResponse {
  status: 'success' | 'error' | 'fail'
  message?: string
  data: {
    profilePicture: string
  }
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordResponse {
  status: 'success' | 'error' | 'fail'
  message?: string
}
