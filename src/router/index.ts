import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue"
import Signup from "../views/Signup.vue";
import PostDetail from '../views/PostDetail.vue'
import store from "../store";
import axios from "axios";
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory, // 采用路由的类型, hash优点：支持旧版浏览器
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                redirectAlreadyLogin:true
            }
        },
        {
            path: '/column/:id',
            name: 'column',
            component: ColumnDetail
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePost,
            meta: {     // 路由元信息
                requiredLogin: true
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/posts/:id',
            name: 'post',
            component: PostDetail
        },
    ]
})
router.beforeEach((to, from,next) => {
    // if(to.meta?.requiredLogin && !store.state.user.isLogin){
    //     next({name: 'login'})
    // }else if (to.meta?.redirectAlreadyLogin && store.state.user.isLogin){
    //     next('/')
    // }else {
    //     next()
    // }
    const {token, user} = store.state
    const {redirectAlreadyLogin, requiredLogin} = to.meta
    console.log('store.state====>', store.state)
    if (!user.isLogin){
        if(token){
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            store.dispatch('fetchCurrentUser').then(() => {
                if (redirectAlreadyLogin){
                    next('/')
                }else {
                    next()
                }
            }).catch(err => {
                console.error(err)
                // localStorage.removeItem('token')
                store.dispatch('logout')
                next('login')
            })
        }else {
            if (requiredLogin){
                next('login')
            }else {
                next()
            }
        }
    }else{
        if (redirectAlreadyLogin){
            next('/')
        }else {
            next()
        }
    }
})
export default router
