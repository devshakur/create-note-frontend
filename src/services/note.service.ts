import api from '../api/axios'
import { ENDPOINTS } from '../api/endpoint'
import type {
  CreateNotePayload,
  CreateNoteResponse,
  DeleteNoteResponse,
  NotesQueryParams,
  NotesResponse,
  UpdateNotePayload,
  UpdateNoteResponse,
} from '../types/note'

const noteService = {
  getAll: async (params: NotesQueryParams = {}): Promise<NotesResponse> => {
    const query: Record<string, string> = {}
    if (params.period) query.period = params.period
    if (params.search?.trim()) query.search = params.search.trim()

    const response = await api.get<NotesResponse>(ENDPOINTS.GET_ALL_NOTES, {
      params: query,
    })
    return response.data
  },

  getById: async (id: string): Promise<CreateNoteResponse> => {
    const response = await api.get<CreateNoteResponse>(ENDPOINTS.GET_NOTE(id))
    return response.data
  },

  create: async (payload: CreateNotePayload): Promise<CreateNoteResponse> => {
    const response = await api.post<CreateNoteResponse>(
      ENDPOINTS.CREATE_NOTE,
      payload,
    )
    return response.data
  },

  update: async (
    id: string,
    payload: UpdateNotePayload,
  ): Promise<UpdateNoteResponse> => {
    const response = await api.put<UpdateNoteResponse>(
      ENDPOINTS.UPDATE_NOTE(id),
      payload,
    )
    return response.data
  },

  delete: async (id: string): Promise<DeleteNoteResponse> => {
    const response = await api.delete<DeleteNoteResponse>(
      ENDPOINTS.DELETE_NOTE(id),
    )
    return response.data
  },
}

export default noteService
