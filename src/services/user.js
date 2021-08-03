import { get, post, put, del } from "../utils/request";

export function UserListApi(page=1) {
    return get('',{page})
}

export function UserCreateApi(data) {
    return post('',data)
}

export function UserGetOneById(id) {
    return get(`/${id}`)
}

export function UserModifyApi(id,data) {
    return put(`/${id}`,data)
}

export function UserDelApi(id) {
    return del(`/${id}`)
}