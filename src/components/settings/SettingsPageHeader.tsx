interface SettingsPageHeaderProps {
  title: string
  subtitle: string
}

const SettingsPageHeader = ({ title, subtitle }: SettingsPageHeaderProps) => {
  return (
    <header className="flex flex-col gap-1">
      <h4 className="m-0 text-md font-bold tracking-tight text-[#171717]! md:text-3xl">
        {title}
      </h4>
      <p className="m-0 text-sm text-[#525252]!">{subtitle}</p>
    </header>
  )
}

export default SettingsPageHeader
