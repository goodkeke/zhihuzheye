<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading"></loader>
<!--    <message type="error" :message="error.message" v-if="error.status"-->
<!--             @close-message="closeMessage"></message>-->
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
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import {useStore} from "vuex";
import {GlobalDataProps} from "./store";
import Login from './views/Login.vue'
import GlobalHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import createMessage from "./components/CreateMessage";
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
    watch(() => error.value.status, () => {
      const {status, message} = error.value
      if(status && message) {
        createMessage(message, 'error')
      }
    })
    return{
      isLoading,
      currentUser,
      // closeMessage,
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
