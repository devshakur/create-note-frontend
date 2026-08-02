import { useMemo, useState } from 'react'
import { Lightbulb, Sparkles } from 'lucide-react'
import CreateNoteModal from '../components/notes/CreateNoteModal'
import DeleteNoteConfirmModal from '../components/notes/DeleteNoteConfirmModal'
import EditNoteModal from '../components/notes/EditNoteModal'
import NotesPageHeader from '../components/notes/NotesPageHeader'
import ViewNoteModal from '../components/notes/ViewNoteModal'
import { NOTE_PERIOD_BY_FILTER, NOTE_FILTER_PANEL_ID } from '../components/notes/constants'
import { mapNoteToReminderCard } from '../components/notes/utils'
import type { NoteTimeFilterValue } from '../components/notes/types'
import ReminderCardList from '../components/reminders/ReminderCardList'
import ReminderCardSkeletonList from '../components/reminders/ReminderCardSkeletonList'
import type { ReminderCardAction } from '../components/reminders/types'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useDeleteNote, useNotes } from '../hooks/useNotes'
import { useNoteAction } from '../hooks/useNoteAction'
import type { NotesQueryParams } from '../types/note'

const Home = () => {
  const [filter, setFilter] = useState<NoteTimeFilterValue>('all')
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const filters = useMemo<NotesQueryParams>(() => {
    const next: NotesQueryParams = {}
    const mappedPeriod = NOTE_PERIOD_BY_FILTER[filter]
    if (mappedPeriod) next.period = mappedPeriod
    return next
  }, [filter])

  const { notes, error, isLoading, isFetching } = useNotes(filters)
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
  const showFocusSection = !isLoading && !error && cards.length > 0
  const filterLabel =
    filter === 'today'
      ? 'Today'
      : filter === 'this-week'
        ? 'Week'
        : filter === 'this-month'
          ? 'Month'
          : filter === 'this-year'
            ? 'Year'
            : 'All'

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
      className={`mx-auto flex h-full w-full  flex-col ${
        showEmptyState ? 'overflow-hidden' : ''
      }`}
    >
      <NotesPageHeader title="My Notes" value={filter} onChange={setFilter} />
      <div
        id={NOTE_FILTER_PANEL_ID}
        role="tabpanel"
        aria-labelledby={`note-filter-${filter}`}
        className={`px-4 pb-2 sm:px-6 xl:px-10 ${
          showEmptyState ? 'flex-1 overflow-hidden' : ''
        }`}
      >
        {isLoading ? (
          <ReminderCardSkeletonList count={4} />
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : showEmptyState ? (
          <EmptyState onAction={() => setIsCreateNoteOpen(true)} />
        ) : (
          <div className={isFetching ? 'opacity-70 transition-opacity' : ''}>
            <ReminderCardList
              cards={cards}
              onOpenCard={openView}
              onCardAction={handleCardAction}
              deletingCardId={deletingCardId}
              archivingCardId={archivingCardId}
            />
          </div>
        )}
        {deleteError ? (
          <p className="mt-2 text-sm text-red-500">{deleteError}</p>
        ) : null}
        {archiveError ? (
          <p className="mt-2 text-sm text-red-500">{archiveError}</p>
        ) : null}
      </div>
      {showFocusSection ? (
        <div className="px-4 sm:px-6 xl:px-10">
          <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="m-0 text-xs font-medium tracking-wide text-(--primary) uppercase">
                  TakeNote Focus
                </p>
                <h4 className="m-0 mt-1 text-base font-semibold text-neutral-900">
                  Keep momentum with small wins
                </h4>
                <p className="m-0 mt-1 text-sm text-neutral-500">
                  You have {cards.length} note{cards.length === 1 ? '' : 's'} in{' '}
                  {filterLabel.toLowerCase()}.
                </p>
              </div>
              <Button type="button" variant="outline" onClick={() => setIsCreateNoteOpen(true)}>
                <Sparkles className="size-4 ext-(--primary)" aria-hidden />
                Quick note
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-neutral-100/70 p-3">
                <p className="m-0 text-xs font-semibold text-neutral-600">Tip</p>
                <p className="m-0 mt-1 text-sm text-neutral-700">
                  Start notes with verbs like Plan, Call, Draft to make action items easy to
                  scan.
                </p>
              </div>
              <div className="rounded-xl bg-neutral-100/70 p-3">
                <p className="m-0 flex items-center gap-1 text-xs font-semibold text-neutral-600">
                  <Lightbulb className="size-3.5" aria-hidden />
                  Focus Prompt
                </p>
                <p className="m-0 mt-1 text-sm text-neutral-700">
                  Pick one note to finish before adding a new one.
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : null}

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

export default Home
