<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 justify-content-start align-items-center" v-if="column" >
      <div class="col-2 text-center">
        <img :src="column.avatar && column.avatar.url" class="rounded-circle border"/>
      </div>
      <div class="col-10 text-start flex-grow-1">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {GlobalDataProps, ColumnProps} from '../store/index'
import PostList from "../components/PostList.vue";
import {generateFitUrl} from "../common/helper";

export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList
  },
  setup(){
    const store = useStore<GlobalDataProps>()
    onMounted(()  => {
      store.dispatch('fetchDetail', currentId.value)
      store.dispatch('fetchPosts', currentId.value)
    })
    const route = useRoute()
    // 为了让 computed 响应对应的变化，添加响应式对象
    const currentId = ref(route.params.id)  //转换为数据格式
    watch(() => route.params, (toParams) => {
      if((toParams && toParams.id) === store.state.user.column){
        // 重新发送请求，在 store 中有对应的缓存设置
        store.dispatch('fetchColumn', toParams.id)
        store.dispatch('fetchPosts', toParams.id)
        // 重新赋值，这样 computed 会变化
        currentId.value = toParams.id
      }
    })

    const column = computed(() =>{
      const selectColumn = store.getters.getColumnById(currentId.value) as ColumnProps
      if(selectColumn){
        generateFitUrl(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list =  computed(() =>store.getters.getPostsByCid(currentId.value))
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
.w-690 {
  width: 690px;
  margin: 0 auto;
}
.column-info img {
  width: 100px;
  height: 100px;
}
</style>
