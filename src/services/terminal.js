import { get, post, put, del } from "../utils/request";
import api from "../api/api";

export function TerminalListApi() {
    return get(api.getAllEquipment)
}


export function NormalBookingListApi() {
    return get(api.getEquipmentDetail)
}

export function NormalBookingListReserveApi(data) {
    return post(api.bookEquipment, data)
}

export function PwdResetApi(data) {
    return post(api.userResetPwd, data)
}


export function TerminalCreateApi(data) {
    return post(api.addEquipment,data)
}

export function TerminalGetOneById(id) {
    return get(api.getEquipment+id)
}

export function TerminalModifyApi(id,data) {
    return put(api.editEquipment+id,data)
}

export function TerminalDelApi(id) {
    return del(api.delEquipment+id)
}

//dashboard apis
export function usageListApi(params) {
    return get(api.userUsage,params)
}

export function equipmentCountApi() {
    return get(api.equipmentCount)
}