export function getToken(){
    return localStorage.getItem("AUTHORIZATION");
}

export function setToken(token,username){
    localStorage.setItem("AUTHORIZATION",'jwt '+token);
    localStorage.setItem("Username",username)
}

export function clearToken() {
    localStorage.removeItem("AUTHORIZATION")
    localStorage.removeItem("Username")
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

export function getUserRole(){
    return localStorage.getItem("userRole");
    //ture is admin
}