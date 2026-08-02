import { useCallback, type KeyboardEvent } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href]:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface UseArrowKeyNavigationOptions {
  orientation?: 'vertical' | 'horizontal'
  loop?: boolean
}

export const useArrowKeyNavigation = ({
  orientation = 'vertical',
  loop = true,
}: UseArrowKeyNavigationOptions = {}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const container = event.currentTarget
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((item) => !item.closest('[aria-hidden="true"]'))

      if (items.length === 0) return

      const currentIndex = items.indexOf(document.activeElement as HTMLElement)
      if (currentIndex === -1) return

      const isVertical = orientation === 'vertical'
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'
      const previousKey = isVertical ? 'ArrowUp' : 'ArrowLeft'

      let nextIndex: number | null = null

      if (event.key === nextKey) {
        nextIndex = loop
          ? (currentIndex + 1) % items.length
          : Math.min(currentIndex + 1, items.length - 1)
      } else if (event.key === previousKey) {
        nextIndex = loop
          ? (currentIndex - 1 + items.length) % items.length
          : Math.max(currentIndex - 1, 0)
      } else if (event.key === 'Home') {
        nextIndex = 0
      } else if (event.key === 'End') {
        nextIndex = items.length - 1
      }

      if (nextIndex === null) return

      event.preventDefault()
      items[nextIndex]?.focus()
    },
    [loop, orientation],
  )

  return { handleKeyDown }
}
