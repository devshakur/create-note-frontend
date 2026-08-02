import type { NotesQueryParams } from '../types/note'

export const noteKeys = {
  all: (userId: string) => ['notes', userId] as const,
  lists: (userId: string) => [...noteKeys.all(userId), 'list'] as const,
  list: (userId: string, filters: NotesQueryParams = {}) => {
    const normalized = {
      ...(filters.period ? { period: filters.period } : {}),
      ...(filters.search ? { search: filters.search } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.page ? { page: filters.page } : {}),
      ...(filters.limit ? { limit: filters.limit } : {}),
    }
    return [...noteKeys.lists(userId), normalized] as const
  },
  detail: (userId: string, id: string) =>
    [...noteKeys.all(userId), 'detail', id] as const,
}
