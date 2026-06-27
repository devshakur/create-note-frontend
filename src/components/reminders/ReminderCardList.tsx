import ReminderCard from './ReminderCard'
import { SAMPLE_REMINDER_CARDS } from './constants'
import type { ReminderCardData } from './types'

interface ReminderCardListProps {
  cards?: ReminderCardData[]
  onEditCard?: (cardId: string) => void
}

const ReminderCardList = ({
  cards = SAMPLE_REMINDER_CARDS,
  onEditCard,
}: ReminderCardListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <ReminderCard
          key={card.id}
          title={card.title}
          time={card.time}
          headerColor={card.headerColor}
          items={card.items}
          onEdit={() => onEditCard?.(card.id)}
        />
      ))}
    </div>
  )
}

export default ReminderCardList
