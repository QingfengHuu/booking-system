import { get, post, put, del } from "../utils/request";
import api from "../api/api";

export function TerminalListApi() {
    return get(api.getAllEquipment)
}

export function TerminalCreateApi(data) {
    return post(api.addEquipment,data)
}

export function TerminalGetOneById(id) {
    return get(api.getEquipment+id)
}

export function TerminalModifyApi(id,data) {
    return put(api.editEquipment,data)
}

export function TerminalDelApi(id) {
    return del(api.delEquipment+id)
}