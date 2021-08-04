import { post } from "../utils/request";
import api from '../api/api'

/**
 * 用户登录
 * @param {*} user 
 * username
 * password
 */
export function loginApi(user){
    return post(api.login,user)
}