import { get, post, put, del } from "../utils/request";

export function UserListApi() {
    return get('/admin/users')
}

export function UserCreateApi(data) {
    return post('admin/users',data)
}

export function UserGetOneById(username) {
    return get(`admin/users/${username}`)
}

export function UserResetApi(username,data) {
    return put(`admin/users/${username}`,data)
}

export function UserDelApi(username) {
    return del(`admin/users/${username}`)
}