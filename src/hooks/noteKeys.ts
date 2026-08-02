import type { NotesQueryParams } from '../types/note'

export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (filters: NotesQueryParams = {}) => {
    const normalized = {
      ...(filters.period ? { period: filters.period } : {}),
      ...(filters.search ? { search: filters.search } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.page ? { page: filters.page } : {}),
      ...(filters.limit ? { limit: filters.limit } : {}),
    }
    return [...noteKeys.lists(), normalized] as const
  },
  detail: (id: string) => ['note', id] as const,
}
