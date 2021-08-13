export function getToken(){
    return localStorage.getItem("AUTHORIZATION");
}

export function setToken(token,username,userRole){
    localStorage.setItem("AUTHORIZATION",'jwt '+token);
    localStorage.setItem("Username",username)
    localStorage.setItem("userRole",userRole)
}

export function clearToken() {
    // localStorage.removeItem("AUTHORIZATION")
    // localStorage.removeItem("Username")
    localStorage.clear()
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