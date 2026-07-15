export const noteKeys = {
  all: ['notes'] as const,
  detail: (id: string) => ['note', id] as const,
}
