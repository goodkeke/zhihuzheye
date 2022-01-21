import {Commit, createStore} from "vuex";
import axios, {AxiosRequestConfig} from "axios";
import {arrToObj, objToArr} from "../common/helper";
const store = createStore<GlobalDataProps>({
    state: {
        error: {status: false},
        token: localStorage.getItem('token') || '',
        loading: false,
        columns: { data: {}, currentPage: 0, total: 0 },
        posts: { data: {}, loadedColumns: [] },
        user: {
            isLogin: false,
            column: ''
        }
    },
    mutations: {
        createPost(state, newPost){
            // state.posts.push(newPost)
            state.posts.data[newPost._id] = newPost
        },
        fetchColumns(state, rawData){
            const { data } = state.columns
            const { list, count, currentPage } = rawData.data
            state.columns = {
                data: { ...data, ...arrToObj(list) },
                total: count,
                currentPage: currentPage * 1
            }
        },
        fetchDetail(state, rawData){
            state.columns.data[rawData.data._id] = rawData.data
        },
        fetchPosts(state, { data: rawData, extraData: columnId }) {
            state.posts.data = { ...state.posts.data, ...arrToObj(rawData.data.list) }
            state.posts.loadedColumns.push(columnId)
        },
        fetchPost(state, rawData){
            state.posts.data[rawData.data._id] = rawData.data
        },
        fetchCurrentUser(state, rawData){
            state.user = { ...rawData.data, isLogin: true}
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
        fetchColumns({ state, commit }, params = {}) {
            const { currentPage = 1, pageSize = 6 } = params
            // if (!state.columns.isLoaded) {
            //   return asyncAndCommit('/columns', 'fetchColumns', commit)
            // }
            if (state.columns.currentPage < currentPage) {
                return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
            }
        },
        fetchDetail({state, commit}, cid) {
            if (!state.columns.data[cid]) {
                return asyncAndCommit(`/columns/${cid}`, 'fetchDetail', commit)
            }
        },
        fetchPosts({ state, commit }, cid) {
            if (!state.posts.loadedColumns.includes(cid)) {
                return asyncAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, { method: 'get' }, cid)
            }
        },
        fetchPost({ state, commit }, id) {
            const currentPost = state.posts.data[id]
            if (!currentPost || !currentPost.content) {
                return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
            } else {
                return Promise.resolve({ data: currentPost })
            }
        },
        fetchCurrentUser({commit}){
            return asyncAndCommit(`/user/current`, 'fetchCurrentUser', commit)
        },
        login({commit}, payload){
            return asyncAndCommit(`/user/login`, 'login', commit, { method: 'post', data: payload })
        },
        createPost({commit}, payload){
            return asyncAndCommit(`/posts`, 'createPost', commit, { method: 'post', data: payload })
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
        getColumns(state){
            return objToArr(state.columns.data)
        },
        getColumnById:(state)=> (id: string) => {
            return state.columns.data[id]
        },
        getPostsByCid:(state)=>(cid: string) => {
            // return state.posts.filter(c => c.column === cid)
            return objToArr(state.posts.data).filter(post => post.column === cid)
        },
        getCurrentPost: (state) => (id: string) => {
            return state.posts.data[id]//state.posts.data ? state.posts.data[id] : id
        }
    }
})
const asyncAndCommit = async(url: string,
                             mutationName: string,
                             commit: Commit,
                             config: AxiosRequestConfig = {method: 'get'},
                             extraData?: any) => {
    const {data} = await axios(url, config)
    if (extraData) {
        commit(mutationName, {data, extraData})
    }else{
        commit(mutationName, data)
    }
    return data
}

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
    columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
    posts: { data: ListProps<PostProps>; loadedColumns: string[] };
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
    author?: string | UserProps
    isHTML?: boolean
}

interface ListProps<P>{
    [id: string]: P
}

export default store
