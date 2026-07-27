import { isAxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/useAuth'
import authService from '../services/auth.service'
import type { AuthUser, UpdateProfilePayload } from '../types/auth'
import { profileKeys } from './profileKeys'
import { profileQueryOptions } from './profileQueryOptions'

const getErrorMessage = (err: unknown, fallback: string) => {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    return data?.message ?? err.message
  }
  if (err instanceof Error) return err.message
  return fallback
}

const patchCachedProfile = (
  queryClient: ReturnType<typeof useQueryClient>,
  patch: Partial<AuthUser>,
) => {
  queryClient.setQueryData<AuthUser>(profileKeys.me(), (current) =>
    current ? { ...current, ...patch } : current,
  )
}

export const useProfile = () => {
  const query = useQuery(profileQueryOptions)

  return {
    profile: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error
      ? getErrorMessage(query.error, 'Failed to load profile')
      : null,
    refetch: query.refetch,
  }
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      authService.updateProfile(payload),
    onSuccess: (response) => {
      queryClient.setQueryData(profileKeys.me(), response.data)
      setUser(response.data)
    },
  })

  return {
    updateProfile: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to update profile')
      : null,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  }
}

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (file: File) => authService.uploadProfilePicture(file),
    onSuccess: (response) => {
      const profilePicture = response.data.profilePicture
      patchCachedProfile(queryClient, { profilePicture })
      const cached = queryClient.getQueryData<AuthUser>(profileKeys.me())
      if (cached) setUser(cached)
    },
  })

  return {
    uploadProfilePicture: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to upload profile picture')
      : null,
    reset: mutation.reset,
  }
}
