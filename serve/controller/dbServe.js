const dbModel = require('../lib/db');

exports.insertNote = async (req, res) => {
    let data = req.body;
    //console.log(data)
    // res.send({
    //     code: 200,
    //     message: 'copied',
    // })
    await dbModel.insertNote(
        [
            data.rest,
            data.message,
            data.name,
            data.userId,
            data.moment,
            data.label,
            data.color,
        ]
    ).then(result => {
        res.send({
            code: 200,
            message: result
        })
    })
}

exports.insertFeedback = async (req, res) => {
    let data = req.body;
    await dbModel.insertFeedback(
        [
            data.noteId,
            data.userId,
            data.type,
            data.moment
        ]
    ).then(result => {
        res.send({
            code: 200,
            message: result
        })
    })
}

exports.insertComment = async (req, res) => {
    let data = req.body;
    await dbModel.insertComment(
        [
            data.noteId,
            data.userId,
            data.comment,
            data.name,
            data.moment
        ]
    ).then(result => {
        res.send({
            code: 200,
            message: result
        })
    })
}
//删除一个note
exports.deleteNote = async (req, res) => {
    let data = req.body;
    await dbModel.deleteNote(data.id).then((result) => {
        res.send({
            code: 200,
            message: result
        })
    })
}
//删除对应note的反馈
exports.deleteFeedback = async (req, res) => {
    let data = req.body;
    await dbModel.deleteFeedback(data.id).then((result) => {
        res.send({
            code: 200,
            message: result,
        })
    })
}
//删除对应note的评论
exports.deleteComment = async (req, res) => {
    let data = req.body;
    await dbModel.deleteComment(data.id).then((result) => {
        res.send({
            code: 200,
            message: result,
        })
    })
}
//分页查询note并获取各项数据
exports.findNotePage=async(req,res)=>{
    let data=req.body;
    // console.log(data);
    await dbModel.findNotePage(data.page,data.pagesize,data.rest,data.lable)
    .then(async (result)=>{
        for(let i=0;i<result.length;i++){
            //查询相应的喜欢和举报的数据
            //点赞
            result[i].like = await dbModel.feedbackCount(result[i].id,0);
            //举报
            result[i].report = await dbModel.feedbackCount(result[i].id,1);
            //是否点赞过了
            result[i].islike = await dbModel.likeCount(result[i].id,data.userId);
            //评论的数量
            result[i].comcount =await dbModel.commentCount(result[i].id);

            // console.log(result.length);
        }
        res.send({
            code:200,
            message:result
        })
    })
}

//倒叙分页查询note的评论
exports.findCommentPage = async (req, res) => {
    let data = req.body;
    await dbModel.findCommentPage(data.page,data.pagesize,data.id).then((result) => {
        res.send({
            code: 200,
            message: result,
        })
    })
}