import fetch from '@/utils/axios'

export const insertNoteApi = (data) => { fetch.post('/insertnote', data) }