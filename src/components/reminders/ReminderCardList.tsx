import HorizontalCarousel from '../carousel/HorizontalCarousel'
import ReminderCard from './ReminderCard'
import type { ReminderCardData } from './types'

interface ReminderCardListProps {
  cards: ReminderCardData[]
  onOpenCard?: (cardId: string) => void
  onEditCard?: (cardId: string) => void
}

const ReminderCardList = ({
  cards,
  onOpenCard,
  onEditCard,
}: ReminderCardListProps) => {
  return (
    <HorizontalCarousel className="w-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className="h-[360px] w-[min(100%,280px)] shrink-0 snap-start sm:w-[280px]"
        >
          <ReminderCard
            title={card.title}
            time={card.time}
            headerColor={card.headerColor}
            items={card.items}
            onOpen={() => onOpenCard?.(card.id)}
            onEdit={() => onEditCard?.(card.id)}
          />
        </div>
      ))}
    </HorizontalCarousel>
  )
}

export default ReminderCardList
