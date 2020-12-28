import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


//懒加载
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')

const routes =[
    {
        path:'/',
        redirect: "/home"
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: "/profile",
        component: Profile
    }

];


//为了去除重复点击导航路由报错解决办法  如果是用push方法的话，就用push代替。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
    return originalReplace.call(this, location).catch(err => err)
};

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router