import { Alert } from '@mui/material'
import React from 'react'

export const AlertError = ({ error, errorMessage }) => {
  return (
    <>
      {
        error && <Alert sx={{ mt: 2 }} severity='error'>{errorMessage}</Alert>
      }
    </>
  )
}
