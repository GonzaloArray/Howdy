import { combineReducers } from 'redux'
import { userSlice } from './slice/sliceAuth'
import { languageSlice } from './slice/sliceLenguaje'

export const authReducer = combineReducers({
  user: userSlice.reducer,
  lan: languageSlice.reducer
})
