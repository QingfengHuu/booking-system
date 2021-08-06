const api = [{
    //Login
    login: '/login',

    //User
    getAllUser: '/admin/users',
    addUser: '/admin/users',
    delUser: '/admin/users/',
    resetUserPwd: '/admin/users/',

    //Equipment
    getAllEquipment: '/equipments',
    addEquipment: '/equipments',
    getEquipment: '/equipments/',
    editEquipment: '/equipments/',
    delEquipment: '/equipments/',
    getTotalStatus: '/equipments/',
    getEquipmentDetail: "/equimentdetail",

    //Book
    getHistoryBook: 'book/historyBook?u_id=',
    getNowBook: 'book/nowBook?u_id=',
    extendBook: 'book/extendBook?',

    }]

export default api