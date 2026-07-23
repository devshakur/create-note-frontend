import { Search } from 'lucide-react'
import NoteTimeFilter from './NoteTimeFilter'
import type { NoteTimeFilterValue } from './types'

interface SearchNotesHeaderProps {
  search: string
  onSearchChange: (value: string) => void
  period: NoteTimeFilterValue
  onPeriodChange: (value: NoteTimeFilterValue) => void
  className?: string
}

const SearchNotesHeader = ({
  search,
  onSearchChange,
  period,
  onPeriodChange,
  className,
}: SearchNotesHeaderProps) => {
  return (
    <header
      className={`flex w-full flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between xl:px-10 xl:py-8 ${className ?? ''}`}
    >
      <label className="relative w-full max-w-md">
        <span className="sr-only">Search notes</span>
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden
        />
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          autoComplete="off"
          className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-colors focus:border-(--primary) focus:ring-1 focus:ring-(--primary)/25"
        />
      </label>

      <NoteTimeFilter value={period} onChange={onPeriodChange} />
    </header>
  )
}

export default SearchNotesHeader
