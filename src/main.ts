import { createApp } from 'vue'
import axios from "axios";
import store from "./store/index"
import router from './router/index'
import App from './App.vue'
import {createRequire} from 'module'


const icode = 'AB45921CA1348422'
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use((config) => {
    console.log('config===>', config)
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
    return res
})

axios.get(`/columns`).then(res => {
    console.log('res===>', res)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
