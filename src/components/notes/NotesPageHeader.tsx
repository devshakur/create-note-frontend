import NoteTimeFilter from './NoteTimeFilter'
import type { NotesPageHeaderProps } from './types'

const NotesPageHeader = ({ title, value, onChange, className}: NotesPageHeaderProps) => {
  return (
    <header className={`flex w-full flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between  ${className}`}>
      <h3 className="m-0 text-xl font-semibold">{title}</h3>
      <NoteTimeFilter value={value} onChange={onChange} />
    </header>
  )
}

export default NotesPageHeader
