import NoteTimeFilter from './NoteTimeFilter'
import type { NotesPageHeaderProps } from './types'

const NotesPageHeader = ({ title, value, onChange, className}: NotesPageHeaderProps) => {
  return (
    <header className={`flex w-full flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between xl:px-10 xl:py-8 ${className ?? ''}`}>
      <h3 className="m-0 text-xl font-semibold">{title}</h3>
      <NoteTimeFilter value={value} onChange={onChange} />
    </header>
  )
}

export default NotesPageHeader
