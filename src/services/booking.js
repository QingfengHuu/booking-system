import { get, post, put, del } from "../utils/request";
import api from '../api/api'

//Node booking
export function NodeBookingListApi() {
    return get(api.getEquipmentDetail)
}

export function NodeBookingListReserveApi(data) {
    return post(api.bookEquipment, data)
}

//Cluster booking
export function ClusterBookingListApi() {
    return get(api.getClusterEquipment)
}