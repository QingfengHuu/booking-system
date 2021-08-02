import { get, post, put, del } from "request";

export function listApi(page=1) {
    return get('',{page,per:2})
}

export function createApi(data) {
    return post('',data)
}

export function modifyApi(id,data) {
    return put('/${id}',data)
}

export function delApi(id) {
    return del('/${id}')
}