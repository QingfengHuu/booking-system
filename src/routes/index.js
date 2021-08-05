import Account from "../pages/Account";
import TerminalList from "../pages/admin/terminal/TerminalList";
import UserList from "../pages/admin/user/UserList";
import OrderList from "../pages/admin/order/OderList";
import BookingList from "../pages/booking/BookingList";
import Detail from "../pages/booking/Detail";
import Index from "../pages/dashboard/";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import TerminalEdit from "../pages/admin/terminal/TerminalEdit";

export const mainRoutes = [{
    path: '/login',
    component: Login
},{
    path: '/404',
    component: PageNotFound
}]

export const userRoutes=[{
    path: '/user/account',
    component: Account,
    exact: true,
    isShow: true,
}]

export const adminRoutes=[{
    path: '/admin/terminal',
    component: TerminalList,
    exact: true,
    isShow: true,
    title: 'Terminal Manage'
},{
    path: '/admin/terminal/edit/:id?',
    component: TerminalEdit,
    isShow: false
},{
    path: '/admin/order',
    component: OrderList,
    exact: true,
    isShow: true,
    title: 'Order Manager'
},{
    path: '/admin/user',
    component: UserList,
    exact: true,
    isShow: true,
    title: 'User Manager'
}]

export const bookingRoutes = [{
    path: '/dashboard',
    component: Index,
    isShow: true,
    title: 'Dashboard',
},{
    path: '/booking',
    component: BookingList,
    exact: true,
    isShow: true,
    title: 'Booking',
},{
    path: '/booking/look/:id',
    component: Detail,
    isShow: false
}]