import {ColumnProps, ImageProps, UserProps} from "../store";

export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number){
    if(data.avatar){
        generateFitUrl(data.avatar, width, height)
    }else {
        const parseCol = data as ColumnProps
        data.avatar = {
            fitUrl: require(parseCol.title ? '@/assets/column.jpg' : '@/assets/avatar.jpg')
        }
    }
}

export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
    if (data?.url){
        const formatStr = format.reduce((prev, current) => {
            return current + ',' + prev
        }, '')
        data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
    }
}

interface CheckCondition {
    format?: string[]
    size?: number
}
type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck(file: File, condition: CheckCondition) {
    const {format, size} = condition
    const isVaildFormat = format ? format.includes(file.type) : true
    const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
    let error: ErrorType = null
    if(!isVaildFormat){
        error = 'format'
    }
    if(!isValidSize){
        error = 'size'
    }
    return {
        passed: isVaildFormat && isValidSize,
        error
    }
}

export const objToArr = <T>(obj: {[key: string]: T}) => {
    return Object.keys(obj).map(key => obj[key])
}