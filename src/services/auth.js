import { post } from "../utils/request";

/**
 * 用户登录
 * @param {*} user 
 * username
 * password
 */
export function loginApi(user){
    return post('',user)
}