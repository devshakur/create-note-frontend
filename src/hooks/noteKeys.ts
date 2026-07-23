export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (filters: { period?: string; search?: string } = {}) => {
    const normalized = {
      ...(filters.period ? { period: filters.period } : {}),
      ...(filters.search ? { search: filters.search } : {}),
    }
    return [...noteKeys.lists(), normalized] as const
  },
  detail: (id: string) => ['note', id] as const,
}

