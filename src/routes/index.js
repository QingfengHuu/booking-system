import BookingList from "../pages/booking/BookingList";
import Detail from "../pages/booking/Detail";
import Index from "../pages/dashboard/";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

export const mainRoutes = [{
    path: '/login',
    component: Login
},{
    path: '/404',
    component: PageNotFound
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