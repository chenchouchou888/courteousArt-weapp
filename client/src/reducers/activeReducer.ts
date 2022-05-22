import { ACTIVE } from '../constants/active'

const INITIAL_STATE = 'index'

export default function changeActive (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE:
      return action.data
   
    default:
      return state
  }
}