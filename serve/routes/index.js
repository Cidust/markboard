const controller = require('../controller/dbServe')

module.exports = function (app) {
    app.get('/test', (req, res) => {
        res.type('html');
        res.render('test');
    })
    //新建note
    app.post('/insertnote', (req, res) => {
        controller.insertNote(req, res)
    })
    //新建反馈
    app.post('/insertfeedback', (req, res) => {
        controller.insertFeedback(req, res)
    })
    //新建评论
    app.post('/insertcomment', (req, res) => {
        controller.insertComment(req, res)
    })

    //删除note
    app.post('/deletenote', (req, res) => {
        controller.deleteNote(req, res)
    })

    //删除反馈
    app.post('/deletefeedback', (req, res) => {
        controller.deleteFeedback(req, res)
    })

    //删除评论
    app.post('/deletecomment', (req, res) => {
        controller.deleteComment(req, res)
    })

    //分页查询note
    app.post('/findnotepage', (req, res) => {
        controller.findNotePage(req, res)
    })

    //分页查询评论
    app.post('/findcommentpage', (req, res) => {
        controller.findCommentPage(req, res)
    })

    app.post('/signip',(req,res)=>{
        const ip=req.ip;
        res.send({
            code:200,
            ip:ip
        })
    })
}