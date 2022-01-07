import {createStore} from "vuex";

export interface UserProps {
    isLogin: boolean;
    nickname?: string;
    id?: string;
    column?: string;
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
export interface ColumnProps {
    id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}