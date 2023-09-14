import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  friend: [],
  loading: false,
  status: 'not-authenticated',
  error: false,
  errorMessage: ''
}

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    addFriend: (state, action) => {
      const newFriendId = action.payload.email
      const isFriendAlreadyAdded = state.friend.some((friendId) => friendId.email === newFriendId)

      if (!isFriendAlreadyAdded) {
        state.friend.push(action.payload)
      }
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
export const { checkingCredentials, loginError, reset, addFriend } = friendSlice.actions
