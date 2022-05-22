import { SHOW } from '../constants/show'

const INITIAL_STATE = false//初始值

export default function changeShow (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW:
      return action.data
   
    default:
      return state
  }
}