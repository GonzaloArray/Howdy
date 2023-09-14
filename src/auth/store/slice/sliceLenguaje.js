import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: '',
  loading: false,
  error: false,
  errorMessage: 'error'
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {

  }
})
