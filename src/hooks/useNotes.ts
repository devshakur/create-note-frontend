import { isAxiosError } from 'axios'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useAuth } from '../context/useAuth'
import noteService from '../services/note.service'
import type {
  CreateNotePayload,
  NotesPagination,
  NotesQueryParams,
  UpdateNotePayload,
} from '../types/note'
import { noteKeys } from './noteKeys'

const DEFAULT_PAGINATION: NotesPagination = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 1,
}

const getErrorMessage = (err: unknown, fallback: string) => {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    return data?.message ?? err.message
  }
  if (err instanceof Error) return err.message
  return fallback
}

export const useNotes = (filters: NotesQueryParams = {}) => {
  const { user } = useAuth()
  const userId = user?.id

  const query = useQuery({
    queryKey: noteKeys.list(userId ?? 'anonymous', filters),
    queryFn: async () => {
      const response = await noteService.getAll(filters)
      return {
        notes: response.data ?? [],
        results: response.results ?? response.data?.length ?? 0,
        pagination: response.pagination ?? {
          ...DEFAULT_PAGINATION,
          page: filters.page ?? 1,
          limit: filters.limit ?? 20,
          total: response.data?.length ?? 0,
        },
      }
    },
    enabled: Boolean(userId),
    // Keep prior page/filter results only within the same authenticated user.
    placeholderData: (previousData, previousQuery) => {
      if (!userId) return undefined
      const previousUserId = previousQuery?.queryKey?.[1]
      if (previousUserId !== userId) return undefined
      return keepPreviousData(previousData)
    },
  })

  return {
    notes: query.data?.notes ?? [],
    results: query.data?.results ?? 0,
    pagination: query.data?.pagination ?? DEFAULT_PAGINATION,
    isLoading: query.isLoading || !userId,
    isFetching: query.isFetching,
    error: query.error
      ? getErrorMessage(query.error, 'Failed to load notes')
      : null,
    refetch: query.refetch,
  }
}

export const useNote = (id: string) => {
  const { user } = useAuth()
  const userId = user?.id

  const query = useQuery({
    queryKey: noteKeys.detail(userId ?? 'anonymous', id),
    queryFn: async () => {
      const response = await noteService.getById(id)
      return response.data
    },
    enabled: Boolean(id) && Boolean(userId),
  })

  return {
    note: query.data,
    isLoading: query.isLoading || !userId,
    error: query.error
      ? getErrorMessage(query.error, 'Failed to load note')
      : null,
    refetch: query.refetch,
  }
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.id

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => noteService.create(payload),
    onSuccess: () => {
      if (!userId) return
      void queryClient.invalidateQueries({ queryKey: noteKeys.all(userId) })
    },
  })

  return {
    createNote: mutation.mutateAsync,
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to create note')
      : null,
    isLoading: mutation.isPending,
  }
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.id

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateNotePayload
    }) => noteService.update(id, payload),
    onSuccess: (_data, variables) => {
      if (!userId) return
      void queryClient.invalidateQueries({ queryKey: noteKeys.all(userId) })
      void queryClient.invalidateQueries({
        queryKey: noteKeys.detail(userId, variables.id),
      })
    },
  })

  return {
    updateNote: (id: string, payload: UpdateNotePayload) =>
      mutation.mutateAsync({ id, payload }),
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to update note')
      : null,
    isLoading: mutation.isPending,
  }
}

export const useDeleteNote = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.id

  const mutation = useMutation({
    mutationFn: (id: string) => noteService.delete(id),
    onSuccess: (_data, id) => {
      if (!userId) return
      void queryClient.invalidateQueries({ queryKey: noteKeys.all(userId) })
      void queryClient.removeQueries({ queryKey: noteKeys.detail(userId, id) })
    },
  })

  return {
    deleteNote: mutation.mutateAsync,
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to delete note')
      : null,
    isLoading: mutation.isPending,
  }
}

export const useArchiveNote = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.id

  const mutation = useMutation({
    mutationFn: (id: string) => noteService.archive(id),
    onSuccess: (_data, id) => {
      if (!userId) return
      void queryClient.invalidateQueries({ queryKey: noteKeys.all(userId) })
      void queryClient.invalidateQueries({
        queryKey: noteKeys.detail(userId, id),
      })
    },
  })

  return {
    archiveNote: mutation.mutateAsync,
    error: mutation.error
      ? getErrorMessage(mutation.error, 'Failed to archive note')
      : null,
    isLoading: mutation.isPending,
  }
}
