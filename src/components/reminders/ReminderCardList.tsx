import HorizontalCarousel from '../carousel/HorizontalCarousel'
import { REMINDER_CARD_FRAME_CLASS, REMINDER_CARD_FRAME_GRID } from './cardSize'
import ReminderCard from './ReminderCard'
import type { ReminderCardAction, ReminderCardData } from './types'

interface ReminderCardListProps {
  cards: ReminderCardData[]
  layout?: 'carousel' | 'grid'
  onOpenCard?: (cardId: string) => void
  onCardAction?: (cardId: string, action: ReminderCardAction) => void
  deletingCardId?: string | null
  archivingCardId?: string | null
  archiveMode?: 'archive' | 'unarchive'
}

const ReminderCardList = ({
  cards,
  onOpenCard,
  onCardAction,
  deletingCardId = null,
  archivingCardId = null,
  archiveMode = 'archive',
  layout = 'carousel',
}: ReminderCardListProps) => {
  const content = cards.map((card) => (
    <div
      key={card.id}
      className={layout === 'grid' ? 'w-full' : REMINDER_CARD_FRAME_CLASS}
    >
      <ReminderCard
        title={card.title}
        time={card.time}
        headerColor={card.headerColor}
        items={card.items}
        onOpen={() => onOpenCard?.(card.id)}
        onAction={(action) => onCardAction?.(card.id, action)}
        isDeleting={deletingCardId === card.id}
        isArchiving={archivingCardId === card.id}
        archiveMode={archiveMode}
      />
    </div>
  ))

  if (layout === 'grid') {
    return <div className={REMINDER_CARD_FRAME_GRID}>{content}</div>
  }

  return <HorizontalCarousel className="w-full">{content}</HorizontalCarousel>
}

export default ReminderCardList
