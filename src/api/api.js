const api = {
    //Login
    login: '/login',

    //admin User
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
    bookEquipment: "book/bookEquipment",
  
    //dashboard
    userUsage:"/book/bookStatistics",
    equipmentCount:"/equipmentcounts ",

    //User action
    userResetPwd:'/userInfo',


}

export default api