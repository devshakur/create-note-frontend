const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) return []

  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true' &&
      element.tabIndex !== -1,
  )
}

export const focusInitialElement = (container: HTMLElement | null) => {
  if (!container) return

  const preferred = container.querySelector<HTMLElement>(
    'input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
  )
  const focusable = getFocusableElements(container)
  ;(preferred ?? focusable[0])?.focus()
}
