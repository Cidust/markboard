import service from '@/utils/axios'

// 查询登入者ip地址
export const signIpApi = () => { return service.post('/signip') }
// 插入一张新的note
export const insertNoteApi = (data) => { return service.post('/insertnote', data) }
// 查询后端的数据
export const findNotePageApi = (data) => { return service.post('/findnotepage', data) }
// 建立一个“喜欢”的反馈
export const insertFeedbackApi = (data) => { return service.post('/insertfeedback', data) }
// 插入评论
export const insertCommentApi = (data) => { return service.post('/insertcomment', data) }
// 评论初始化时寻找评论
export const findCommentPageApi = (data) => { return service.post('/findcommentpage', data) }