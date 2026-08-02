import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  total?: number
  onPageChange: (page: number) => void
  isLoading?: boolean
  className?: string
}

const getVisiblePages = (page: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (page <= 3) return [1, 2, 3, 4, 5]
  if (page >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [page - 2, page - 1, page, page + 1, page + 2]
}

const Pagination = ({
  page,
  totalPages,
  total,
  onPageChange,
  isLoading = false,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(page, totalPages)
  const canGoPrevious = page > 1 && !isLoading
  const canGoNext = page < totalPages && !isLoading

  return (
    <nav
      aria-label="Pagination"
      className={`mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row ${className ?? ''}`}
    >
      <p className="m-0 text-sm text-neutral-500">
        Page {page} of {totalPages}
        {typeof total === 'number' ? ` · ${total} total` : ''}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={!canGoPrevious}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>

        {pages.map((pageNumber) => {
          const isActive = pageNumber === page
          return (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
              disabled={isLoading}
              onClick={() => onPageChange(pageNumber)}
              className={`inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-60 ${
                isActive
                  ? 'bg-(--primary) text-white'
                  : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}

        <button
          type="button"
          aria-label="Next page"
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
