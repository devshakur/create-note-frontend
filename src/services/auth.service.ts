import api from '../api/axios'
import { ENDPOINTS } from '../api/endpoint'
import type {
  AuthResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginPayload,
  LogoutResponse,
  ProfileResponse,
  RegisterPayload,
  UpdateProfilePayload,
  UploadProfilePictureResponse,
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

  changePassword: async (
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> => {
    const response = await api.post<ChangePasswordResponse>(
      ENDPOINTS.CHANGE_PASSWORD,
      payload,
    )
    return response.data
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>(ENDPOINTS.GET_PROFILE)
    return response.data
  },

  updateProfile: async (
    payload: UpdateProfilePayload,
  ): Promise<ProfileResponse> => {
    const response = await api.put<ProfileResponse>(
      ENDPOINTS.UPDATE_PROFILE,
      payload,
    )
    return response.data
  },

  uploadProfilePicture: async (
    file: File,
  ): Promise<UploadProfilePictureResponse> => {
    const formData = new FormData()
    formData.append('profilePicture', file)

    const response = await api.patch<UploadProfilePictureResponse>(
      ENDPOINTS.UPLOAD_PROFILE_PICTURE,
      formData,
    )
    return response.data
  },
}

export default authService
