import {Commit, createStore} from "vuex";
import axios from "axios";
import {safeOnMounted} from "ahooks-vue/dist/src/utils";
const store = createStore<GlobalDataProps>({
    state: {
        loading: false,
        columns: [],
        posts: [],
        user: { isLogin: false, nickname: 'Kyunwoo', columnId: 1}
    },
    mutations: {
        login(state, data){
            console.log('login data=========>', data)
            state.user = {...state.user, isLogin: false, nickname: 'Kyunwoo', columnId: 1}
        },
        createPost(state, newPost){
            state.posts.push(newPost)
        },
        fetchColumns(state, rowData){
            state.columns = rowData.data.list
        },
        fetchDetail(state, rowData){
            state.columns = [rowData.data]
        },
        fetchPosts(state, rowData){
            state.posts = rowData.data.list
        },
        setLoading(state, status){
            state.loading = status
        }
    },
    actions: {
        fetchColumns({commit}){
            getAndCommit(`/columns`, 'fetchColumns', commit)
        },
        fetchDetail({commit}, cid) {
            getAndCommit(`/columns/${cid}`, 'fetchDetail', commit)
        },
        fetchPosts({commit}, cid) {
            getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
        },
        login({commit}, payload){
            postAndCommit()
        }
        // async mLogin({commit}, params) {
        //     const data = await axios.post(`/user/login`, params)
        //     commit('login', data)
        // }
    },
    getters: { // getters返回值会依赖根据缓存，且当依赖值发生改变时才会被重新计算
        bigColumnsLen(state){
            return state.columns.filter(c=>+c._id>2).length
        },
        getColumnById:(state)=> (id: string) => {
            return state.columns.find(c => c._id === id)
        },
        getPostsByCid:(state)=>(cid: string) => {
            return state.posts.filter(c => c.column === cid)
        }
    }
})
const postAndCommit = async (url:string, mutationName: string, commit: Commit, payload: any){
    const {data} = await axios.post(url, payload)
    commit(mutationName, data)
}

const getAndCommit = async (url:string, mutationName: string, commit: Commit) => {
    const {data} = await axios.get(url)
    commit(mutationName, data)
}

 export interface GlobalDataProps{
     loading: boolean
     columns: ColumnProps[]
     posts: PostProps[]
     user: UserProps
 }

export interface UserProps {
    isLogin: boolean;
    nickname?: string;
    id?: string;
    columnId?: number;
    email?: string;
    avatar?: ImageProps;
    description?: string;
}
export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
    fitUrl?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}

export interface PostProps {
    _id: number
    title: string
    excerpt?: string
    content?: string
    image? : ImageProps
    createdAt: string
    column: string
}

export default store
