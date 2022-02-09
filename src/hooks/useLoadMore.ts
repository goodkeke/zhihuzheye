import {computed, ComputedRef, ref} from "vue";
import {useStore} from "vuex";

// function useLoadMore(actionName, params){
//     const loadMorePage = () => {}
//     const isLastPage = computed(() => {
//         Math.ceil(total/pageSize) === currentPage
//     })
// }
interface LoadParams {
    currentPage: number
    pageSize: number
}
const useLoadMore = (actionName: string, total: ComputedRef<number>,
                     params: LoadParams = {currentPage: 2, pageSize: 5}) => {
    const store = useStore()
    const currentPage = ref(params.currentPage)
    const requestParams =computed(() => ({
        currentPage: currentPage.value,
        pageSize: params.pageSize
    }))
    const loadMorePage = () => {
        store.dispatch(actionName, requestParams.value).then(() => {
            currentPage.value ++
        })
    }
    const isLastPage = computed(() => {
      return Math.ceil(total.value/ params.pageSize) < currentPage.value
    })
    return{
        loadMorePage,
        isLastPage,
        currentPage
    }
}
export default useLoadMore