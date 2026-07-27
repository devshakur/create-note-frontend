import { useState } from "react"
import { useDeleteNote } from "./useNotes"
import type { ReminderCardData } from "../components/reminders/types"
import type { Note } from "../types/note"
import { mapNoteToReminderCard } from "../components/notes/utils"

export function useNoteAction(notes: Note[]) {
    const [viewNote, setViewNote] = useState<ReminderCardData | null>(null)
    const [editNote, setEditNote] = useState<Note | null>(null)
    const [deletingCardId, setDeletingCardId] = useState<string | null>(null)
    const [pendingDeleteNote, setPendingDeleteNote] = useState<Note | null>(null)

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

    const handleDelete = (id: string) => {
        const note = notes.find((item) => item.id === id) ?? null
        if (!note) return
        setPendingDeleteNote(note)
    }

    const cancelDelete = () => {
        if (deletingCardId) return
        setPendingDeleteNote(null)
    }

    const confirmDelete = async () => {
        const id = pendingDeleteNote?.id
        if (!id) return

        setDeletingCardId(id)
        try {
            await deleteNote(id)
            if (viewNote?.id === id) setViewNote(null)
            if (editNote?.id === id) setEditNote(null)
            setPendingDeleteNote(null)
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
        pendingDeleteNote,
        openView,
        openEdit,
        handleDelete,
        confirmDelete,
        cancelDelete,
        closeView,
        closeEdit,
    }
}