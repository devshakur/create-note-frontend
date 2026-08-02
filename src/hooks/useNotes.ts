import { isAxiosError } from 'axios'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
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
  const query = useQuery({
    queryKey: noteKeys.list(filters),
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
    placeholderData: keepPreviousData,
  })

  return {
    notes: query.data?.notes ?? [],
    results: query.data?.results ?? 0,
    pagination: query.data?.pagination ?? DEFAULT_PAGINATION,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error
      ? getErrorMessage(query.error, 'Failed to load notes')
      : null,
    refetch: query.refetch,
  }
}

export const useNote = (id: string) => {
  const query = useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: async () => {
      const response = await noteService.getById(id)
      return response.data
    },
    enabled: Boolean(id),
  })

  return {
    note: query.data,
    isLoading: query.isLoading,
    error: query.error
      ? getErrorMessage(query.error, 'Failed to load note')
      : null,
    refetch: query.refetch,
  }
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => noteService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: noteKeys.all })
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

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateNotePayload
    }) => noteService.update(id, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: noteKeys.all })
      void queryClient.invalidateQueries({
        queryKey: noteKeys.detail(variables.id),
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

  const mutation = useMutation({
    mutationFn: (id: string) => noteService.delete(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: noteKeys.all })
      void queryClient.removeQueries({ queryKey: noteKeys.detail(id) })
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

  const mutation = useMutation({
    mutationFn: (id: string) => noteService.archive(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: noteKeys.all })
      void queryClient.invalidateQueries({ queryKey: noteKeys.detail(id) })
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
