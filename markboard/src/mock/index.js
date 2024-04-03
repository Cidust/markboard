import mockjs from "mockjs";

export const noteData = mockjs.mock({
    "data|20":[{
        //time
        "moment":new Date(),
        //note id
        "id|+1":1,
        //user id
        "userId|+1":10,
        //content
        "message|24-96":"@cword",
        //label
        "label|0-2":0,
        //name
        "name":"@cname",
        //likes
        "like|0-120":0,
        //comment
        "comment|0-120":0,
        //background-color
        "imgurl|0-11":0,
        //revoke?
        "revoke|0-20":0,
        //report?
        "report|0-20":0, 
    }]
})

//评论

export const comData = mockjs.mock({
    "data|20":[{
        //time
        "moment":new Date(),
        //note id
        "id|+1":1,
        //user id
        "userId|+1":10,
        //content
        "message|24-60":"@cword",
        //name
        "name":"@cname",
        //background-color
        "imgurl|0-11":0, 
    }]
})
