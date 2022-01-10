import {createStore} from "vuex";
import axios from "axios";
import {testData, testPosts} from '../common/testData'
const store = createStore<GlobalDataProps>({
    state: {
        columns: [],
        posts: [],
        user: { isLogin: false, nickname: 'Kyunwoo', columnId: 1}
    },
    mutations: {
        login(state){
            state.user = {...state.user, isLogin: false, nickname: 'Kyunwoo', columnId: 1}
        },
        createPost(state, newPost){
            state.posts.push(newPost)
        },
        fetchColumns(state, rowData){
            state.columns = rowData.data.list
        },
        fetchDetail(state, rowData){
            console.log('rowData=====>', rowData)
            state.columns = [rowData.data]
        },
        fetchPosts(state, rowData){
            state.posts = rowData.data.list
        }
    },
    actions: {
        fetchColumns(context) {
            console.log('contextttttt', context)
            axios.get('/columns').then(res => {
                context.commit('fetchColumns', res.data)
            })
        },
        fetchDetail({commit}, cid) {
            axios.get(`/columns/${cid}`).then(res => {
                commit('fetchDetail', res.data)
            })
        },
        fetchPosts({commit}, cid) {
            axios.get(`/columns/${cid}/posts`).then(res => {
                commit('fetchPosts', res.data)
            })
        }
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
 export interface GlobalDataProps{
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
    columnId: number
}

export default store
