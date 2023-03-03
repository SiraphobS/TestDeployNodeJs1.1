// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import invoice from '@src/views/apps/invoice/store/reducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  invoice
})

export default rootReducer
