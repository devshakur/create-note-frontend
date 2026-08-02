export interface Note {
  id: string
  title: string
  content: string
  status?: 'ACTIVE' | 'ARCHIVED'
  createdAt?: string
  updatedAt?: string
}

export type NotesPeriod = 'today' | 'week' | 'month' | 'year'
export type NotesStatus = 'active' | 'archived'

export interface NotesPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface NotesQueryParams {
  period?: NotesPeriod
  search?: string
  status?: NotesStatus
  page?: number
  limit?: number
}

export interface CreateNotePayload {
  title: string
  content: string
}

export interface UpdateNotePayload {
  title?: string
  content?: string
}

export interface NotesResponse {
  status: 'success' | 'fail' | 'error'
  results?: number
  pagination?: NotesPagination
  data: Note[]
  message?: string
}

export interface CreateNoteResponse {
  status: 'success' | 'fail' | 'error'
  data: Note
  message?: string
}

export interface UpdateNoteResponse {
  status: 'success' | 'fail' | 'error'
  data: Note
  message?: string
}

export interface DeleteNoteResponse {
  status: 'success' | 'fail' | 'error'
  message?: string
}

export interface ArchiveNoteResponse {
  status: 'success' | 'fail' | 'error'
  message?: string
  data: Note
}
