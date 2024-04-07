import request from "/src/api/request";

// 获取全部评论
export function getComment(query) { 
    return request({
        url: '/system/comment/list',
        method: 'get',
        params: query
    })
}

// 添加评论
export function addComment(data) { 
    return request({
        url: '/system/comment',
        method: 'post',
        data:data,
    })
}