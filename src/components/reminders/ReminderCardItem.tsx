interface ReminderCardItemProps {
  text: string
  showDivider?: boolean
}

const ReminderCardItem = ({ text, showDivider = true }: ReminderCardItemProps) => {
  return (
    <li className={showDivider ? 'border-b border-neutral-100 last:border-b-0' : ''}>
      <p className="m-0 px-4 py-3 text-sm text-neutral-600">{text}</p>
    </li>
  )
}

export default ReminderCardItem
