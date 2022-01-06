<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    ><a href="#" class="navbar-brand">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登陆</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "GlobalHeader",
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>

</style>