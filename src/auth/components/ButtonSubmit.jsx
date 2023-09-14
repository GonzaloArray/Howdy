import { Button, CircularProgress } from '@mui/material'
import React from 'react'

export const ButtonSubmit = ({ title, isValid, status }) => {
  return (
    <Button
      type='submit'
      sx={{
        marginTop: 5,
        textTransform: 'none',
        fontSize: '16px',
        p: '13px'
      }}
      size='large'
      color='secondary'
      variant='contained'
      fullWidth
      disabled={status === 'checking' || !isValid}
    >
      {status === 'checking'
        ? (
          <CircularProgress size={24} color='secondary' />
          )
        : (
            title
          )}
    </Button>
  )
}
