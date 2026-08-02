import { useMemo, useState } from 'react'
import DeleteNoteConfirmModal from '../components/notes/DeleteNoteConfirmModal'
import EditNoteModal from '../components/notes/EditNoteModal'
import NotesPageHeader from '../components/notes/NotesPageHeader'
import ViewNoteModal from '../components/notes/ViewNoteModal'
import { NOTE_FILTER_PANEL_ID, NOTE_PERIOD_BY_FILTER } from '../components/notes/constants'
import { mapNoteToReminderCard } from '../components/notes/utils'
import type { NoteTimeFilterValue } from '../components/notes/types'
import ReminderCardList from '../components/reminders/ReminderCardList'
import ReminderCardSkeletonList from '../components/reminders/ReminderCardSkeletonList'
import type { ReminderCardAction } from '../components/reminders/types'
import EmptyState from '../components/ui/EmptyState'
import Pagination from '../components/ui/Pagination'
import { useDeleteNote, useNotes } from '../hooks/useNotes'
import { useNoteAction } from '../hooks/useNoteAction'
import type { NotesQueryParams } from '../types/note'

const PAGE_SIZE = 8

const Archives = () => {
  const [filter, setFilter] = useState<NoteTimeFilterValue>('all')
  const [page, setPage] = useState(1)

  const filters = useMemo<NotesQueryParams>(() => {
    const next: NotesQueryParams = {
      status: 'archived',
      page,
      limit: PAGE_SIZE,
    }
    const mappedPeriod = NOTE_PERIOD_BY_FILTER[filter]
    if (mappedPeriod) next.period = mappedPeriod
    return next
  }, [filter, page])

  const { notes, error, isLoading, isFetching, pagination } = useNotes(filters)
  const { error: deleteError } = useDeleteNote()
  const {
    viewNote,
    closeEdit,
    closeView,
    editNote,
    deletingCardId,
    archivingCardId,
    pendingDeleteNote,
    archiveError,
    openView,
    openEdit,
    handleDelete,
    handleArchive,
    confirmDelete,
    cancelDelete,
  } = useNoteAction(notes)

  const cards = notes.map(mapNoteToReminderCard)
  const showEmptyState = !isLoading && !error && cards.length === 0

  const handleFilterChange = (value: NoteTimeFilterValue) => {
    setFilter(value)
    setPage(1)
  }

  const handleCardAction = (cardId: string, action: ReminderCardAction) => {
    if (action === 'view') {
      openView(cardId)
      return
    }
    if (action === 'edit') {
      openEdit(cardId)
      return
    }
    if (action === 'archive') {
      void handleArchive(cardId)
      return
    }
    void handleDelete(cardId)
  }

  return (
    <div
      className={`mx-auto flex h-full w-full flex-col ${
        showEmptyState ? 'overflow-hidden' : ''
      }`}
    >
      <NotesPageHeader title="Archives" value={filter} onChange={handleFilterChange} />
      <div
        id={NOTE_FILTER_PANEL_ID}
        role="tabpanel"
        aria-labelledby={`note-filter-${filter}`}
        className={`px-4 pb-6 sm:px-6 xl:px-10 ${
          showEmptyState ? 'flex-1 overflow-hidden' : ''
        }`}
      >
        {isLoading ? (
          <ReminderCardSkeletonList count={4} />
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : showEmptyState ? (
          <EmptyState
            titlePrefix="No archived"
            titleAccent="notes yet!"
            description={
              <>
                Notes you archive will show up here. Archive a note from the
                dashboard or search page to keep things tidy.
              </>
            }
            showAction={false}
          />
        ) : (
          <>
            <div className={isFetching ? 'opacity-70 transition-opacity' : ''}>
              <ReminderCardList
                cards={cards}
                onOpenCard={openView}
                onCardAction={handleCardAction}
                deletingCardId={deletingCardId}
                archivingCardId={archivingCardId}
                archiveMode="unarchive"
                layout="grid"
              />
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              isLoading={isFetching}
              onPageChange={setPage}
            />
          </>
        )}
        {deleteError ? (
          <p className="mt-2 text-sm text-red-500">{deleteError}</p>
        ) : null}
        {archiveError ? (
          <p className="mt-2 text-sm text-red-500">{archiveError}</p>
        ) : null}
      </div>

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

export default Archives
