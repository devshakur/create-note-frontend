import { useMemo, useState } from 'react'
import CreateNoteModal from '../components/notes/CreateNoteModal'
import DeleteNoteConfirmModal from '../components/notes/DeleteNoteConfirmModal'
import EditNoteModal from '../components/notes/EditNoteModal'
import SearchNotesHeader from '../components/notes/SearchNotesHeader'
import ViewNoteModal from '../components/notes/ViewNoteModal'
import { NOTE_PERIOD_BY_FILTER, NOTE_FILTER_PANEL_ID } from '../components/notes/constants'
import { mapNoteToReminderCard } from '../components/notes/utils'
import type { NoteTimeFilterValue } from '../components/notes/types'
import ReminderCardList from '../components/reminders/ReminderCardList'
import ReminderCardSkeletonList from '../components/reminders/ReminderCardSkeletonList'
import type { ReminderCardAction } from '../components/reminders/types'
import EmptyState from '../components/ui/EmptyState'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useDeleteNote, useNotes } from '../hooks/useNotes'
import { useNoteAction } from '../hooks/useNoteAction'
import type { NotesQueryParams } from '../types/note'

const SEARCH_DEBOUNCE_MS = 500

const SearchNote = () => {
  const [period, setPeriod] = useState<NoteTimeFilterValue>('all')
  const [search, setSearch] = useState('')
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS)

  const filters = useMemo<NotesQueryParams>(() => {
    const next: NotesQueryParams = {}
    const mappedPeriod = NOTE_PERIOD_BY_FILTER[period]
    if (mappedPeriod) next.period = mappedPeriod
    if (debouncedSearch) next.search = debouncedSearch
    return next
  }, [period, debouncedSearch])

  const { notes, error, isLoading, isFetching } = useNotes(filters)
  const {
    viewNote,
    closeEdit,
    closeView,
    editNote,
    deletingCardId,
    pendingDeleteNote,
    openView,
    openEdit,
    handleDelete,
    confirmDelete,
    cancelDelete,
  } = useNoteAction(notes)
  const cards = notes.map(mapNoteToReminderCard)
  const { error: deleteError } = useDeleteNote()

  const handleCardAction = (cardId: string, action: ReminderCardAction) => {
    if (action === 'view') {
      openView(cardId)
      return
    }
    if (action === 'edit') {
      openEdit(cardId)
      return
    }
    void handleDelete(cardId)
  }

  return (
    <div className="mx-auto w-full max-w-360">
      <SearchNotesHeader
        search={search}
        onSearchChange={setSearch}
        period={period}
        onPeriodChange={setPeriod}
      />
      <div
        id={NOTE_FILTER_PANEL_ID}
        role="tabpanel"
        aria-labelledby={`note-filter-${period}`}
        className="px-4 pb-2 sm:px-6 xl:px-10"
      >
        {isLoading ? (
          <ReminderCardSkeletonList count={4} />
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : cards.length === 0 ? (
          <EmptyState onAction={() => setIsCreateNoteOpen(true)} />
        ) : (
          <div className={isFetching ? 'opacity-70 transition-opacity' : ''}>
            <ReminderCardList
              cards={cards}
              onOpenCard={openView}
              onCardAction={handleCardAction}
              deletingCardId={deletingCardId}
              layout="grid"
            />
          </div>
        )}
        {deleteError ? (
          <p className="mt-2 text-sm text-red-500">{deleteError}</p>
        ) : null}
      </div>
      <CreateNoteModal
        open={isCreateNoteOpen}
        onClose={() => setIsCreateNoteOpen(false)}
      />
      <ViewNoteModal
        open={viewNote !== null}
        note={viewNote}
        onClose={closeView}
      />
      <EditNoteModal
        open={editNote !== null}
        note={editNote}
        onClose={closeEdit}
      />
      <DeleteNoteConfirmModal
        open={pendingDeleteNote !== null}
        note={pendingDeleteNote}
        isDeleting={Boolean(deletingCardId)}
        onConfirm={() => void confirmDelete()}
        onClose={cancelDelete}
      />
    </div>
  )
}

export default SearchNote
