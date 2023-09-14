import { createSlice } from '@reduxjs/toolkit'
// not-authenticated, checking, authenticated
const initialState = {
  user: {
    name: '',
    photo: '',
    uid: '',
    email: ''
  },
  loading: false,
  status: '',
  error: false,
  errorMessage: '',
  token: true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
    validationAuthenticated: (state) => {
      state.token = true
    },
    login: (state, { payload }) => {
      state.user = {
        name: payload.name,
        photo: payload.photo,
        uid: payload.uid,
        email: payload.email
      }
      state.status = 'authenticated'
      state.loading = false
      state.errorMessage = ''
      state.error = false
      state.token = payload.auth
    },
    loginError: (state, { payload }) => {
      state.user = {
        ...state.user,
        displayName: '',
        photoURL: '',
        email: '',
        uid: ''
      }
      state.status = 'not-authenticated'
      state.loading = false
      state.errorMessage = payload !== '' ? payload : 'Ocurrió un error desconocido'
      state.error = true
    },
    logout: (state) => {
      state.user = {
        ...state.user,
        displayName: '',
        photoURL: '',
        email: '',
        uid: ''
      }
      state.status = 'not-authenticated'
      state.loading = false
      state.errorMessage = ''
      state.error = false
      state.token = true
    },
    reset: (state) => {
      state.user = {
        ...state.user,
        displayName: '',
        photoURL: '',
        email: '',
        uid: ''
      }
      state.status = 'not-authenticated'
      state.loading = false
      state.errorMessage = ''
      state.error = false
      state.token = true
    },
    updatePhoto: (state, action) => {
      state.user = {
        ...state.user,
        photo: action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { checkingCredentials, login, loginError, logout, validationAuthenticated, reset, updatePhoto } = userSlice.actions
