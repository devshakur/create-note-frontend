export const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  CREATE_NOTE: '/notes/create-note',
  GET_ALL_NOTES: '/notes/all-notes',
  GET_NOTE: (id: string) => `/notes/${id}`,
  UPDATE_NOTE: (id: string) => `/notes/update-note/${id}`,
  DELETE_NOTE: (id: string) => `/notes/delete-note/${id}`,
}
