const mysql = require('mysql');
const config = require('../config/default');

const db = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
});

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.MKB,
})

//直接使用pool.query
let bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

//通过pool.getConnection获得链接
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release();//链接放回池中
                });
            }
        })
    })
}

//创建数据库
let markboard = 'create database if not exists markboard default charset utf8 collate utf8_general_ci'

let createDatabase = (db) => {
    return bdbs(db, {});
}

//创建数据，note
let notes = `create table if not exists notes(
    id INT NOT NULL AUTO_INCREMENT,
    rest INT NOT NULL COMMENT '所属餐厅0对应5，1对应6，2对应8',
    message VARCHAR(1000) NOT NULL COMMENT '评论本体',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    userId VARCHAR(100) NOT NULL COMMENT '创建者id',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    label INT NOT NULL COMMENT '标签',
    color INT COMMENT '颜色',
    PRIMARY KEY ( id ) 
);`
//留言反馈
let feedbacks = `create table if not exists feedbacks(
    id INT NOT NULL AUTO_INCREMENT,
    noteId INT NOT NULL COMMENT 'note的id',
    userId VARCHAR(100) NOT NULL COMMENT '反馈者id如若是游客则记录ip地址',
    type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id ) 
);`
//评论
let comments = `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    noteId INT NOT NULL COMMENT 'note的id',
    userId VARCHAR(100) NOT NULL COMMENT '评论者的id',
    comment VARCHAR(1000) COMMENT '评论内容',
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    moment VARCHAR(100) NOT NULL COMMENT '时间',
    PRIMARY KEY ( id )
);`


let createTable = (sql) => {
    return query(sql, []);
}

//先创建数据库再创建表
async function create() {
    await createDatabase(markboard);
    createTable(notes);
    createTable(feedbacks);
    createTable(comments);
}

create();

//创建新的note表项目
exports.insertNote = (value) => {
    let _sql = 'insert into notes set rest=?,message=?,name=?,userId=?,moment=?,label=?,color=?;'
    return query(_sql, value);
}
//创建新的feedback内容
exports.insertFeedback = (value) => {
    let _sql = 'insert into feedbacks set noteId=?,userId=?,type=?,moment=?;'
    return query(_sql, value);
}
//创建新的comment内容
exports.insertComment = (value) => {
    let _sql = 'insert into comments set noteId=?,userId=?,comment=?,name=?,moment=?;'
    return query(_sql, value);
}

//删除note并且同时删除comment和feedback
exports.deleteNote = (id) => {
    let _sql = `delete a,b,c from notes a left join feedbacks b on a.id=b.noteId left join comments c on a.id=c.noteId where a.id="${id}";`
    return query(_sql);
}
//删除feedback的内容
exports.deleteFeedback = (id) => {
    let _sql = `delete from feedbacks where id="${id}";`
    return query(_sql);
}
//删除一条评论
exports.deleteComment = (id) => {
    let _sql = `delete from comments where id="${id}";`
    return query(_sql);
}
//分页查询note
exports.findNotePage = (page, pagesize, rest, label) => {
    let _sql;
    //当选择的是“全部”时
    if (label == -1) {
        _sql = `select * from notes where rest="${rest}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
    } else {
        _sql = `select * from notes where rest="${rest}" and label="${label}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
    }
    return query(_sql);
}
//分页查询评论
exports.findCommentPage = (page, pagesize, id) => {
    let _sql = `select * from comments where noteId="${id}" order by id desc limit ${(page - 1) * pagesize},${pagesize};`
    return query(_sql);
}
//查询各种反馈的总数
exports.feedbackCount = (nid, type) => {
    let _sql = `select count(*) as count from feedbacks where noteId="${nid}" and type="${type}";`
    return query(_sql);
}
//查询评论总数
exports.commentCount = (nid) => {
    let _sql = `select count(*) as count from comments where noteId="${nid}";`
    return query(_sql);
}
exports.likeCount=(nid,uid)=>{
    let _sql=`select count(*) as count from feedbacks where noteId="${nid}" and userId="${uid}" and type=0;`
}