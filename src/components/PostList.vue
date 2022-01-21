<template>
  <div class="post-list">
    <article v-for="post in list"
             :key="post._id"
             class="card mb-3 shadow-sm text-start">
      <div class="card-body">
        <h4><router-link :to="`/posts/${post._id}/`">{{post.title}}</router-link></h4>
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
import {generateFitUrl} from "../common/helper";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup(props){
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    return {
      posts
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
