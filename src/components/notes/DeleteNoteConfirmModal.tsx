import Button from '../ui/Button'
import Modal from '../ui/Modal'
import type { Note } from '../../types/note'

interface DeleteNoteConfirmModalProps {
  open: boolean
  note: Note | null
  isDeleting?: boolean
  onConfirm: () => void
  onClose: () => void
}

const DeleteNoteConfirmModal = ({
  open,
  note,
  isDeleting = false,
  onConfirm,
  onClose,
}: DeleteNoteConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete note"
      footer={
        <>
          <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </Button>
        </>
      }
    >
      <p className="m-0 text-sm text-neutral-600">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-neutral-900">{note?.title ?? 'this note'}</span>?
        This action cannot be undone.
      </p>
    </Modal>
  )
}

export default DeleteNoteConfirmModal
