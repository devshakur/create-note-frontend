interface KeyboardShortcutProps {
  keys: string
  variant?: 'default' | 'onDark'
}

const variantClasses = {
  default:
    'rounded-md border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-[11px] font-medium text-neutral-500',
  onDark:
    'rounded-md border border-neutral-600 bg-neutral-800 px-1.5 py-0.5 font-mono text-[11px] font-medium text-neutral-300',
}

const KeyboardShortcut = ({ keys, variant = 'default' }: KeyboardShortcutProps) => {
  return <kbd className={variantClasses[variant]}>{keys}</kbd>
}

export default KeyboardShortcut
