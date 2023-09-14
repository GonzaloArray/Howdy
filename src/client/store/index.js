import { combineReducers } from 'redux'
import { friendSlice } from './slice/sliceFriend'
import { chatSlice } from './slice/sliceChat'

export const clientReducer = combineReducers({
  friend: friendSlice.reducer,
  chat: chatSlice.reducer
})
