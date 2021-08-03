import { get, post, put, del } from "../utils/request";

export function listApi(page=1) {
    return get('',{page})
}

export function createApi(data) {
    return post('',data)
}

export function getOneById(id) {
    return get(`api/admin/terminal/${id}`)
}

export function modifyApi(id,data) {
    return put('/${id}',data)
}

export function delApi(id) {
    return del('/${id}')
}