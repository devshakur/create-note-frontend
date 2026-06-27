export const getFolderInitials = (name: string): string => {
  const words = name.trim().split(/\s+/)

  if (words.length >= 2) {
    return words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('')
  }

  return name.slice(0, 2)
}
