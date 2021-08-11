const api = {
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
    getEquipmentDetail: "/equipmentdetail",

    getClusterEquipment: '/equipmentcluster',

    //Book
    getAllBook: 'book/allBook/',
    getHistoryBook: 'book/historyBook',
    getNowBook: 'book/nowBook',
    extendBook: 'book/extendBook',
    endBook: 'book/endBook',
    bookEquipment: "book/bookEquipment"


}

export default api