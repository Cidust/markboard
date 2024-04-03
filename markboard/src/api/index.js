import service from '@/utils/axios'

export const signIpApi = () => { return service.post('/signip') }

export const insertNoteApi = (data) => { service.post('/insertnote', data) }