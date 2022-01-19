import {Commit, createStore} from "vuex";
import axios from "axios";
const store = createStore<GlobalDataProps>({
    state: {
        error: {status: false},
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: [],
        posts: [],
        user: {
            isLogin: false,
            column: ''
        }
    },
    mutations: {
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
        fetchCurrentUser(state, rowData){
            state.user = {isLogin: true, ...rowData.data}
        },
        setLoading(state, status){
            state.loading = status
        },
        setError(state, e: GlobalErrorProps){
            state.error = e
        },
        login(state, rawData){
            const {token} = rawData.data
            state.token = token
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        },
        setLogout(state) {
            state.token = ''
            state.user = {isLogin: false}
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.Authorization
            // router.push('/login')
        }
    },
    actions: {
        fetchColumns({commit}){
            return getAndCommit(`/columns`, 'fetchColumns', commit)
        },
        fetchDetail({commit}, cid) {
            return getAndCommit(`/columns/${cid}`, 'fetchDetail', commit)
        },
        fetchPosts({commit}, cid) {
            return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
        },
        fetchCurrentUser({commit}){
            return getAndCommit(`/user/current`, 'fetchCurrentUser', commit)
        },
        login({commit}, payload){
            return postAndCommit(`/user/login`, 'login', commit, payload)
        },
        createPost({commit}, payload){
            return postAndCommit(`/posts`, 'createPost', commit, payload)
        },
        loginAndFetch({dispatch}, loginData){
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        },
        logout({commit}){
            commit('setLogout')
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
const postAndCommit = async (url:string, mutationName: string, commit: Commit, payload: any) => {
    const {data} = await axios.post(url, payload)
    commit(mutationName, data)
}

const getAndCommit = async (url:string, mutationName: string, commit: Commit) => {
    const {data} = await axios.get(url)
    commit(mutationName, data)
    return data
}

// 通用错误处理
export interface GlobalErrorProps {
    status: boolean
    message?: string
}

export interface GlobalDataProps{
    error: GlobalErrorProps
    token: string
    loading: boolean
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps
}
export interface ResponseType<p = {}>{
    _id: string
    code?: string
    msg: string
    data: p
}
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
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
    _id?: number
    title?: string
    excerpt?: string
    content?: string
    image? : ImageProps | string
    createdAt?: string
    column?: string
    author?: string
}

export default store
