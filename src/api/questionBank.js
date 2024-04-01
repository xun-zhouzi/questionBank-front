import request from "/src/api/request";

// 请求类型列表
export  function getType(query) { 
    return request({
        url: '/system/type/list',
        method: 'get',
        params: query
    })
}


// 请求问题列表
export function getQuestion(query) { 
    return request({
        url: '/system/question/list',
        method: 'get',
        params:query
    })
}

// 新增问题
export function addQuestion(data) { 
    return request({
        url: '/system/question',
        method: 'post',
        data:data
    })
}

// 编辑
export function editQuestion(data) { 
    return request({
        url: '/system/question',
        method: 'put',
        data:data
    })
}

// 删除
export function deleteQuestion(id) { 
    return request({
        url: '/system/question/'+id,
        method: 'delete',
    })
}



