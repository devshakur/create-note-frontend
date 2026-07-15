import Modal from '../ui/Modal'
import Button from '../ui/Button'
import type { ReminderCardData } from '../reminders/types'

interface ViewNoteModalProps {
  open: boolean
  note: ReminderCardData | null
  onClose: () => void
}

const ViewNoteModal = ({ open, note, onClose }: ViewNoteModalProps) => {
  if (!note) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={note.title}
      footer={
        <Button type="button" variant="primary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {note.time ? (
          <p className="m-0 text-sm text-neutral-500">
            <span className="font-medium text-neutral-700">Created </span>
            {note.time}
          </p>
        ) : null}

        <ul className="m-0 max-h-[50vh] list-none overflow-y-auto rounded-xl border border-neutral-100 p-0 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
          {note.items.map((item, index) => (
            <li
              key={item.id}
              className={
                index < note.items.length - 1
                  ? 'border-b border-neutral-100'
                  : ''
              }
            >
              <p className="m-0 px-4 py-3 text-sm text-neutral-700">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default ViewNoteModal
