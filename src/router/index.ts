import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue"
import store from "../store";
const routerHistory = createWebHashHistory()
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
    ]
})
router.beforeEach((to, from,next) => {
    if(to.meta?.requiredLogin && !store.state.user.isLogin){
        next({name: 'login'})
    }else if (to.meta?.redirectAlreadyLogin && store.state.user.isLogin){
        next('/')
    }else {
        next()
    }
})
export default router
