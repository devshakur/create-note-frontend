import { useState, type FormEvent } from 'react'
import { useCreateNote } from '../../hooks/useNotes'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Modal from '../ui/Modal'

export interface CreateNoteFormValues {
  title: string
  content: string
}

interface CreateNoteModalProps {
  open: boolean
  onClose: () => void
  onSave?: (values: CreateNoteFormValues) => void
}

const CreateNoteModal = ({ open, onClose, onSave }: CreateNoteModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { createNote, error, isLoading } = useCreateNote()

  const isValid = title.trim().length > 0 && content.trim().length > 0

  const resetForm = () => {
    setTitle('')
    setContent('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid || isLoading) return

    try {
      const values = { title: title.trim(), content: content.trim() }
      const response = await createNote(values)
      if (!response) return

      onSave?.(values)
      resetForm()
      onClose()
    } catch {
      // error is surfaced via hook
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create a new note"
      footer={
        <>
          <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-note-form"
            variant="primary"
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form
        id="create-note-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Title"
          name="note-title"
          placeholder="Note title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="note-content"
            className="text-sm font-semibold text-gray-600"
          >
            Content
          </label>
          <textarea
            id="note-content"
            name="note-content"
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

export default CreateNoteModal
