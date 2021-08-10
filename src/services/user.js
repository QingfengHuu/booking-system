import { get, post, put, del } from "../utils/request";
import api from "../api/api";

export function UserListApi() {
    return get(api.getAllUser)
}

export function UserCreateApi(data) {
    return post(api.addUser,data)
}

export function UserGetOneById(username) {
    return get(api.addUser+username)
}

export function UserResetApi(username,data) {
    return put(api.resetUserPwd+username,data)
}

export function UserDelApi(username) {
    return del(api.delUser+username)
}