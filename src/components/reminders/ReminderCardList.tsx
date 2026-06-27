import HorizontalCarousel from '../carousel/HorizontalCarousel'
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
    <HorizontalCarousel>
      {cards.map((card) => (
        <div key={card.id} className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[280px]">
          <ReminderCard
            title={card.title}
            time={card.time}
            headerColor={card.headerColor}
            items={card.items}
            onEdit={() => onEditCard?.(card.id)}
          />
        </div>
      ))}
    </HorizontalCarousel>
  )
}

export default ReminderCardList
