import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  friend: {
    name: '',
    photo: '',
    uid: ''
  },
  loading: false,
  status: 'not-authenticated',
  error: false,
  errorMessage: ''
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    userFriendSelect: (state, action) => {
      state.friend.name = action.payload.displayName
      state.friend.photo = action.payload.photoURL
      state.friend.uid = action.payload.uid
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
    loginError: (state, { payload }) => {
      state.friend = []
      state.status = 'not-authenticated'
      state.loading = false
      state.errorMessage = payload !== '' ? payload : 'Ocurrió un error desconocido'
      state.error = true
    },
    reset: (state) => {
      state.friend = []
      state.status = 'not-authenticated'
      state.loading = false
      state.errorMessage = ''
      state.error = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { checkingCredentials, loginError, reset, userFriendSelect } = chatSlice.actions
