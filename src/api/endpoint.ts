export const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CHANGE_PASSWORD: '/auth/change-password',
  GET_PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update-profile',
  UPLOAD_PROFILE_PICTURE: '/profile/picture',
  CREATE_NOTE: '/notes/create-note',
  GET_ALL_NOTES: '/notes/all-notes',
  GET_NOTE: (id: string) => `/notes/${id}`,
  UPDATE_NOTE: (id: string) => `/notes/update-note/${id}`,
  DELETE_NOTE: (id: string) => `/notes/delete-note/${id}`,
  ARCHIVE_NOTE: (id: string) => `/notes/note/${id}/archive`,
}

