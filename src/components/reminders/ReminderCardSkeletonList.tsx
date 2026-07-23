import HorizontalCarousel from '../carousel/HorizontalCarousel'
import { REMINDER_CARD_FRAME_CLASS } from './cardSize'
import ReminderCardSkeleton from './ReminderCardSkeleton'

interface ReminderCardSkeletonListProps {
  count?: number
}

const ReminderCardSkeletonList = ({ count = 4 }: ReminderCardSkeletonListProps) => {
  return (
    <div aria-busy="true" aria-label="Loading notes">
      <HorizontalCarousel className="w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={REMINDER_CARD_FRAME_CLASS}>
            <ReminderCardSkeleton />
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  )
}

export default ReminderCardSkeletonList
