<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle"/>
      </div>
      <div class="col-9 text-start">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {GlobalDataProps} from '../store/index'
import {testData, testPosts} from "../common/testData";
import PostList from "../components/PostList.vue";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList
  },
  setup(){
    const store = useStore<GlobalDataProps>()
    console.log('state===>', store.getters)
    const route = useRoute()
    // 为了让 computed 响应对应的变化，添加响应式对象
    const currentId = +route.params.id  //转换为数据格式
    const column = testData.find(c => c.id === currentId)
    const list = testPosts.filter(post => post.columnId === currentId)
    // const column = computed(() =>store.getters.getColumnById(currentId.value))
    // const list =  computed(() =>store.getters.getPostsByCid(currentId.value))
    return{
      route,
      currentId,
      column,
      list
    }
  }
})
</script>

<style scoped>

</style>
