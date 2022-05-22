import {SHOW} from '../constants/show'
export const changeShow = (changeTo) =>{
    return {
        type:SHOW,
        data:changeTo
    }
}
//封装一个action给reducer