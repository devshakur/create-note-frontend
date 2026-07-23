import type { ReactNode } from 'react'

interface SettingsCardProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  id?: string
}

const SettingsCard = ({
  title,
  description,
  children,
  footer,
  id,
}: SettingsCardProps) => {
  return (
    <section
      id={id}
      className="rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="border-b border-neutral-100 px-5 py-5 sm:px-6">
        <h2 className="m-0 text-base font-semibold text-[#171717]!">{title}</h2>
        <p className="mt-1 m-0 text-sm text-[#525252]!">{description}</p>
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
      {footer ? (
        <div className="flex justify-end border-t border-neutral-100 px-5 py-4 sm:px-6">
          {footer}
        </div>
      ) : null}
    </section>
  )
}

export default SettingsCard
