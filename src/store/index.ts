import {createStore} from "vuex";
import {testData, testPosts, ColumnProps, PostProps} from '../common/testData'
const store = createStore<GlobalDataProps>({
    state: {
        columns: testData,
        posts: testPosts,
        user: { isLogin: true, nickname: 'Kyunwoo', columnId: 1}
    },
    mutations: {
        login(state){
            state.user = {...state.user, isLogin: true, nickname: 'Kyunwoo', columnId: 1}
        },
        createPost(state, newPost){
            state.posts.push(newPost)
        }
    },
    getters: { // getters返回值会依赖根据缓存，且当依赖值发生改变时才会被重新计算
        bigColumnsLen(state){
            return state.columns.filter(c=>c.id>2).length
        },
        getColumnById:(state)=> (id: number) => {
            return state.columns.find(c => c.id === id)
        },
        getPostsByCid:(state)=>(cid: number) => {
            return state.posts.filter(c => c.columnId === cid)
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
    id?: string;
    url?: string;
    createdAt?: string;
    fitUrl?: string;
}
// export interface ColumnProps {
//     id: string;
//     title: string;
//     avatar?: ImageProps;
//     description: string;
// }

// export interface PostProps {
//     id: number
//     title: string
//     content: string
//     image? : string
//     createdAt: string
//     columnId: number
// }

export default store
