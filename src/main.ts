import { createApp } from 'vue'
import axios from "axios";
import store from "./store"
import router from './router'
import App from './App.vue'


const icode = 'AB45921CA1348422'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use((config) => {
    store.commit('setLoading', true)
    config.params = {
        ...config.params,
        icode
    }
    if(config.data instanceof FormData){
        config.data.append('icode', icode)
    }else {
        config.data = {...config.data, icode}
    }
    return config
})
axios.interceptors.response.use((res) => {
    setTimeout(() => {
        store.commit('setLoading', false)
    },500)
    return res
}, error => {
    return Promise.reject(error)
})

axios.get(`/columns`).then(res => {
    console.log('res===>', res)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
