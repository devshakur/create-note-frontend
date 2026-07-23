import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
  leftIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--primary)] text-white hover:brightness-95 focus-visible:outline-[var(--primary)]',
  outline:
    'border border-neutral-200 bg-white text-[var(--text-h)] hover:bg-neutral-50 focus-visible:outline-neutral-400',
}

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  leftIcon,
  type = 'button',
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-[filter,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        variantClasses[variant]
      } ${fullWidth ? 'w-full' : ''} ${className ?? ''}`}
      {...props}
    >
      {leftIcon ? (
        <span className="shrink-0" aria-hidden>
          {leftIcon}
        </span>
      ) : null}
      {children}
    </button>
  )
}

export default Button
