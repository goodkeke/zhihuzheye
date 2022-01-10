<template>
  <div class="row">
    <div v-for="item in columnList" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar && item.avatar.url" class="rounded-circle border border-light my-3"/>
          <h5 class="card-title text-truncate">{{item.title}}</h5>
          <p class="card-text text-left description text-truncate">{{item.description}}</p>
          <router-link :to="`/column/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link>
<!--          <router-link :to="{name: 'column', params: {id: item.id}}" class="btn btn-outline-primary">进入专栏</router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, PropType} from 'vue'
import {ColumnProps} from '../store'

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props){
    const columnList = computed(() => {
      return props.list.map(item => {
        if(!item.avatar){
          item.avatar = {
              url: 'https://tse1-mm.cn.bing.net/th/id/R-C.a139f7dc8136f0935116959325535160?rik=cV4%2fACHJ%2fCNJ%2bQ&riu=http%3a%2f%2fimg.bcyacg.com%2fpic%2f2f9489cc42bf657569cb3a95c6bc8bc0.jpg&ehk=xipXN0pnUyAEngcFCxemYeYjGqHrg4355FIGGvf9XO8%3d&risl=&pid=ImgRaw&r=0'
          }
        }
        return item
      })
    })
    return {
      columnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
.description {
  line-height: 20px;
  height: 60px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
