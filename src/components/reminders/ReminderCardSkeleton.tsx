import Skeleton from '../ui/Skeleton'

const ReminderCardSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 bg-neutral-100 px-4 py-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-14" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-0 px-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-3 ${
              index < 3 ? 'border-b border-neutral-100' : ''
            }`}
          >
            <Skeleton className={`h-4 ${index % 2 === 0 ? 'w-[80%]' : 'w-[60%]'}`} />
          </div>
        ))}
      </div>

      <div className="flex min-h-12 shrink-0 items-center justify-end px-3 py-3">
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  )
}

export default ReminderCardSkeleton
