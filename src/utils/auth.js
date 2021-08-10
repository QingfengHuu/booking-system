export function getToken(){
    return localStorage.getItem("AUTHORIZATION");
}

export function setToken(token,username){
    localStorage.setItem("AUTHORIZATION",'jwt '+token);
    localStorage.setItem("Username",username)
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

export function getUsername(){
    return localStorage.getItem("Username");
}