import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { authReducer } from '../../auth/store'
import { clientReducer } from '../../client/store'

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer
})

export const store = configureStore({
  reducer: rootReducer
})
