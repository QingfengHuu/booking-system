export function getToken(){
    return localStorage.getItem("AUTHORIZATION");
}

export function setToken(token){
    localStorage.setItem("AUTHORIZATION",'jwr'+token);
}

export function clearToken() {
    localStorage.removeItem("AUTHORIZATION")
}

export function isLogined(){
    if(localStorage.getItem("AUTHORIZATION")){
        return true;
    }
    return false;
}