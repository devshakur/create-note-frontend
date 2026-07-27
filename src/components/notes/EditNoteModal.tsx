import { useState, type FormEvent } from 'react'
import { useUpdateNote } from '../../hooks/useNotes'
import type { Note } from '../../types/note'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Modal from '../ui/Modal'

interface EditNoteModalContentProps {
  open: boolean
  note: Note
  onClose: () => void
}

const EditNoteModalContent = ({ open, note, onClose }: EditNoteModalContentProps) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const { updateNote, error, isLoading } = useUpdateNote()

  const isValid = title.trim().length > 0 && content.trim().length > 0

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid || isLoading) return

    try {
      await updateNote(note.id, {
        title: title.trim(),
        content: content.trim(),
      })
      onClose()
    } catch {
      // error is surfaced via hook
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Edit note"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-note-form"
            variant="primary"
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </>
      }
    >
      <form
        id="edit-note-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Title"
          name="edit-note-title"
          placeholder="Note title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="edit-note-content"
            className="text-sm font-semibold text-gray-600"
          >
            Content
          </label>
          <textarea
            id="edit-note-content"
            name="edit-note-content"
            rows={6}
            required
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-y rounded-md border border-neutral-200 bg-white px-3.5 py-2 text-sm text-gray-600 placeholder:text-gray-300 outline-none transition-colors focus:border-(--primary) focus:ring-1 focus:ring-(--primary)/25"
          />
        </div>

        {error ? <p className="text-xs text-red-500">{error}</p> : null}
      </form>
    </Modal>
  )
}

interface EditNoteModalProps {
  open: boolean
  note: Note | null
  onClose: () => void
}

const EditNoteModal = ({ open, note, onClose }: EditNoteModalProps) => {
  if (!open || !note) return null

  return <EditNoteModalContent key={note.id} open={open} note={note} onClose={onClose} />
}

export default EditNoteModal
