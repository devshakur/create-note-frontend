import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  error?: string
}

const Input = ({
  id,
  label,
  leftIcon,
  rightIcon,
  error,
  type = 'text',
  ...props
}: InputProps) => {
  const inputId = id ?? props.name

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-gray-600"
      >
        {label}
      </label>

      <div className="relative">
        {leftIcon ? (
          <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400"
            aria-hidden
          >
            {leftIcon}
          </span>
        ) : null}

        <input
          id={inputId}
          type={type}
          className={`w-full rounded-md border bg-white py-2 text-sm text-gray-600 placeholder:text-gray-300 outline-none transition-colors focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/25 disabled:cursor-not-allowed disabled:opacity-60 ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/25'
              : 'border-neutral-200'
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />

        {rightIcon ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-neutral-400">
            {rightIcon}
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={inputId ? `${inputId}-error` : undefined} className="text-xs text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default Input
