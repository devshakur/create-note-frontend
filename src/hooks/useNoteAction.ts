import { useState } from "react"
import { useDeleteNote } from "./useNotes"
import type { ReminderCardData } from "../components/reminders/types"
import type { Note } from "../types/note"
import { mapNoteToReminderCard } from "../components/notes/utils"

export function useNoteAction(notes: Note[]) {
    const [viewNote, setViewNote] = useState<ReminderCardData | null>(null)
    const [editNote, setEditNote] = useState<Note | null>(null)
    const [deletingCardId, setDeletingCardId] = useState<string | null>(null)

    const { deleteNote } = useDeleteNote()

    const openView = (id: string) => {
        const note = notes.find((item) => item.id === id) ?? null
        setViewNote(note ? mapNoteToReminderCard(note, 0) : null)
    }
    const closeView = () => {
        setViewNote(null)
      }

    const openEdit = (id: string) => {
        const note = notes.find((item) => item.id === id) ?? null
        setEditNote(note)
    }
    const closeEdit = () => {
        setEditNote(null)
      }

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm('Delete this note? This cannot be undone.')
        if (!confirmed) return

        setDeletingCardId(id)
        try {
            await deleteNote(id)
            if (viewNote?.id === id) setViewNote(null)
            if (editNote?.id === id) setEditNote(null)
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingCardId(null)
        }
    }

    return {
        viewNote,
        editNote,
        deletingCardId,
        openView,
        openEdit,
        handleDelete,
        closeView,
        closeEdit,
    }
}