import { get, post, put, del } from "../utils/request";

export function bookListApi() {
    return get('')
}

export function bookCreateApi(data) {
    return post('',data)
}

export function BookGetOneById(id) {
    return get(`api/admin/book/${id}`)
}

export function BookModifyApi(id,data) {
    return put('/${id}',data)
}

export function BookDelApi(id) {
    return del('/${id}')
}