<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/login" class="navbar-brand">者也专栏</router-link >
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {UserProps} from "../store";

export default defineComponent({
  name: "GlobalHeader",
  components: {},
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>