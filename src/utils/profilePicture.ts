const DEFAULT_PROFILE_PICTURE = 'https://via.placeholder.com/150'

export const getNameInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'

  const firstInitial = parts[0]?.[0]?.toUpperCase() ?? ''
  const lastInitial =
    parts.length > 1
      ? (parts[parts.length - 1]?.[0]?.toUpperCase() ?? '')
      : ''

  return `${firstInitial}${lastInitial}` || '?'
}

export const hasCustomProfilePicture = (url?: string | null) => {
  const trimmed = url?.trim()
  if (!trimmed) return false
  if (trimmed === DEFAULT_PROFILE_PICTURE) return false
  return !trimmed.includes('via.placeholder.com')
}
