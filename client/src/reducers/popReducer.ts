import { POP } from '../constants/active'

const INITIAL_STATE = {
    author:'',
    name:'',
    priceList:[],
    url:''
}

export default function changeActive (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POP:
      return action.data
   
    default:
      return state
  }
}