import service from '@/utils/axios'

export const signIpApi = () => { return service.post('/signip') }

export const insertNoteApi = (data) => { return service.post('/insertnote', data) }