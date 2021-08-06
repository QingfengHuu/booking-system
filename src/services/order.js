import { get, post, put, del } from "../utils/request";
import api from "../api/api";

export function OrderListApi() {
    return get(api.getAllBook)
}

export function OrderHistoryListApi(params) {
    return get(api.getHistoryBook,params)
}

export function OrderNowListApi(params) {
    return get(api.getNowBook,params)
}

export function OrderExtendApi(params) {
    return get(api.extendBook,params)
}

export function OrderEndApi(params) {
    return get(api.endBook,params)
}