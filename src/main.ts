import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import App from './App.vue'

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
            component: Login
        }
    ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
