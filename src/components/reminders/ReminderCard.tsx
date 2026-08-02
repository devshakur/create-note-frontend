import ReminderCardActionsMenu from './ReminderCardActionsMenu'
import ReminderCardHeader from './ReminderCardHeader'
import ReminderCardItem from './ReminderCardItem'
import type { ReminderCardProps } from './types'

/** Preview shows enough lines to fill the dummy-card height; full list opens in modal. */
const PREVIEW_ITEM_COUNT = 4

const ReminderCard = ({
  title,
  time,
  headerColor,
  items,
  onOpen,
  onAction,
  isDeleting = false,
  isArchiving = false,
  archiveMode = 'archive',
}: ReminderCardProps) => {
  const previewItems = items.slice(0, PREVIEW_ITEM_COUNT)
  const hasMore = items.length > PREVIEW_ITEM_COUNT

  const handleOpen = () => {
    onOpen?.()
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleOpen()
        }
      }}
      className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm outline-none transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      aria-label={`Open note ${title}`}
    >
      <ReminderCardHeader title={title} time={time} headerColor={headerColor} />

      <ul className="m-0 min-h-0 flex-1 list-none overflow-hidden p-0">
        {previewItems.map((item, index) => (
          <ReminderCardItem
            key={item.id}
            text={item.text}
            showDivider={index < previewItems.length - 1 || hasMore}
          />
        ))}
        {hasMore ? (
          <li>
            <p className="m-0 px-4 py-3 text-sm text-neutral-400">
              +{items.length - PREVIEW_ITEM_COUNT} more…
            </p>
          </li>
        ) : null}
      </ul>

      <div className="relative flex min-h-12 shrink-0 items-center justify-end bg-white px-3 py-3">
        <ReminderCardActionsMenu
          title={title}
          isDeleting={isDeleting}
          isArchiving={isArchiving}
          archiveMode={archiveMode}
          onAction={(action) => onAction?.(action)}
        />
      </div>
    </article>
  )
}

export default ReminderCard
