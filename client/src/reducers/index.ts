import { combineReducers } from 'redux'
import activeReducer from './activeReducer'
import showReducer from './showReducer'
import popReducer from './popReducer'

export default combineReducers({
  activeReducer,
  showReducer,
  popReducer
})