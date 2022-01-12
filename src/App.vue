<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <h1>{{error.message}}</h1>
    <loader v-if="isLoading"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 知乎专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue'
import {useStore} from "vuex";
import {GlobalDataProps} from "./store";
import Login from './views/Login.vue'
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
export default defineComponent({
  components: {
    Login,GlobalHeader,Loader
  },
  setup(){
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    onMounted(async () => {
      if(!currentUser.value.isLogin && token.value){
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        const data = await store.dispatch('fetchCurrentUser')
      }
    })
    return{
      isLoading,
      currentUser,
      error
    }
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
