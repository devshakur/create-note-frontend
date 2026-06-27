interface ReminderCardHeaderProps {
  title: string
  time: string
  headerColor: string
}

const ReminderCardHeader = ({
  title,
  time,
  headerColor,
}: ReminderCardHeaderProps) => {
  return (
    <header
      className="flex items-center justify-between px-4 py-3"
      style={{ backgroundColor: headerColor }}
    >
      <h3 className="m-0 text-base font-semibold text-neutral-900">{title}</h3>
      <time className="text-sm text-neutral-800">{time}</time>
    </header>
  )
}

export default ReminderCardHeader
