import Account from "../pages/Account";
import TerminalList from "../pages/admin/terminal/TerminalList";
import UserList from "../pages/admin/user/UserList";
import OrderList from "../pages/admin/order/OderList";
import BookingList from "../pages/booking/ClusterBookingList";
import NormalBookingList from "../pages/booking/NodeBooking";
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
    title: 'My Booking',
}]

export const DashboardRoutes = [
    {
    path: '/dashboard',
    component: Index,
    isShow: true,
    title: 'Dashboard',
}]

export const adminRoutes=[{
    path: '/admin/terminal',
    component: TerminalList,
    exact: true,
    isShow: true,
    title: 'Terminal'
},{
    path: '/admin/terminal/edit/:id?',
    component: TerminalEdit,
    isShow: false
},{
    path: '/admin/order',
    component: OrderList,
    exact: true,
    isShow: true,
    title: 'Order'
},{
    path: '/admin/user',
    component: UserList,
    exact: true,
    isShow: true,
    title: 'User'
}]

export const bookingRoutes = [
    {
    path: '/ClusterBooking',
    component: BookingList,
    exact: true,
    isShow: true,
    title: 'Clusters',
},
{
    path: '/NodeBookingList',
    component: NormalBookingList,
    isShow: true,
    title: 'Nodes',
}]