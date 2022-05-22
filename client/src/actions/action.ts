import {ACTIVE} from '../constants/active'
export const changeActive = (changeTo) =>{
    return {
        type:ACTIVE,
        data:changeTo
    }
}