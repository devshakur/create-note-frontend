import ReminderCardEditButton from './ReminderCardEditButton'
import ReminderCardHeader from './ReminderCardHeader'
import ReminderCardItem from './ReminderCardItem'
import type { ReminderCardProps } from './types'

const ReminderCard = ({
  title,
  time,
  headerColor,
  items,
  onEdit,
}: ReminderCardProps) => {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <ReminderCardHeader title={title} time={time} headerColor={headerColor} />

      <ul className="m-0 list-none p-0 pb-12">
        {items.map((item, index) => (
          <ReminderCardItem
            key={item.id}
            text={item.text}
            showDivider={index < items.length - 1}
          />
        ))}
      </ul>

      <ReminderCardEditButton onClick={onEdit} title={title} />
    </article>
  )
}

export default ReminderCard
