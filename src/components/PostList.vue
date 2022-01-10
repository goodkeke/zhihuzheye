<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm text-start">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-3" v-if="post.image">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100 h-100">
          </div>
          <p :class="{'col-9': post.image}">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, PropType} from 'vue'
import {PostProps} from '../store'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup(){
    return {
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
