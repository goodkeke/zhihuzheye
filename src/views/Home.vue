<template>
  <div class="home-page">
    <!--  <h2>{{bigColumnLen}}</h2>-->
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage" v-if="!isLastPage">
      加载更多
    </button>
    <p v-else>已經到底了~</p>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from 'vue'
import {GlobalDataProps} from '../store'
import {useStore} from 'vuex'
import ColumnList from "../components/ColumnList.vue";
import useLoadMore from "../hooks/useLoadMore";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns', {pageSize: 3})
    })
    const total = computed(()=> store.state.columns.total)
    const list =  computed(() => store.getters.getColumns)
    const currentPage = computed(() => store.state.columns.currentPage)
    const {loadMorePage, isLastPage} = useLoadMore('fetchColumns',  total,
      {
      currentPage: currentPage.value ? currentPage.value+1: 2,
      pageSize: 3
    })
    return {
      list,
      total,
      loadMorePage,
      isLastPage
    }
  },
})
</script>

<style scoped>

</style>
