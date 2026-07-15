import { useState } from 'react'
import NotesPageHeader from '../components/notes/NotesPageHeader'
import ViewNoteModal from '../components/notes/ViewNoteModal'
import { mapNoteToReminderCard } from '../components/notes/utils'
import type { NoteTimeFilterValue } from '../components/notes/types'
import FolderCardList from '../components/folders/FolderCardList'
import ReminderCardList from '../components/reminders/ReminderCardList'
import type { ReminderCardData } from '../components/reminders/types'
import SidebarDivider from '../components/sidebar/SidebarDivider'
import { useNotes } from '../hooks/useNotes'

const Home = () => {
  const [filter, setFilter] = useState<NoteTimeFilterValue>('today')
  const [selectedCard, setSelectedCard] = useState<ReminderCardData | null>(null)
  const { notes, error, isLoading } = useNotes()

  const cards = notes.map(mapNoteToReminderCard)

  const openCard = (cardId: string) => {
    const card = cards.find((item) => item.id === cardId) ?? null
    setSelectedCard(card)
  }

  const closeCard = () => setSelectedCard(null)

  return (
    <div className="flex h-full flex-col ">
      <NotesPageHeader title="My Notes" value={filter} onChange={setFilter} className='md:p-10' />
      <div className="px-4 pb-2 md:px-12">
        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading notes...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : cards.length === 0 ? (
          <p className="text-sm text-neutral-500">No notes yet. Create your first note.</p>
        ) : (
          <ReminderCardList
            cards={cards}
            onOpenCard={openCard}
            onEditCard={openCard}
          />
        )}
      </div>
      <div className='px-6'>
        <SidebarDivider />
      </div>
     
      <div className="px-4 pb-4 md:px-12">
        <FolderCardList />
      </div>

      <ViewNoteModal
        open={selectedCard !== null}
        note={selectedCard}
        onClose={closeCard}
      />
    </div>
  )
}

export default Home
