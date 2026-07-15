export interface Note {
  id: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
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
