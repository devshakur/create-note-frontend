import { queryOptions } from '@tanstack/react-query'
import authService from '../services/auth.service'
import { profileKeys } from './profileKeys'

export const profileQueryOptions = queryOptions({
  queryKey: profileKeys.me(),
  queryFn: async () => {
    const response = await authService.getProfile()
    return response.data
  },
  staleTime: Infinity,
  gcTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
})
