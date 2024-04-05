import service from '@/utils/axios'

// 查询登入者ip地址
export const signIpApi = () => { return service.post('/signip') }
// 插入一张新的note
export const insertNoteApi = (data) => { return service.post('/insertnote', data) }
// 查询后端的数据
export const findNotePageApi = (data) => { return service.post('/findnotepage', data) }