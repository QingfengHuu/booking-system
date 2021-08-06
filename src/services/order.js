import { get, post, put, del } from "../utils/request";
import api from "../api/api";

export function OrderListApi(params) {
    return get(api.getAllBook)
}

export function OrderHistoryListApi(params) {
    return get(api.getHistoryBook,params)
}



export function OrderGetOneById(username) {
    return get(api.addUser+username)
}

export function OrderResetApi(username,data) {
    return put(api.resetUserPwd+username,data)
}

export function OrderDelApi(username) {
    return del(api.delUser+username)
}