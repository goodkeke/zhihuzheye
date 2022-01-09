import { createApp } from 'vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from "./views/ColumnDetail.vue"
import store from "./store/index"
import router from './router/index'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
