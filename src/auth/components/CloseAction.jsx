import { Box, Button } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

export const CloseAction = () => {
  return (
    <Box
      component='div'
      sx={{ display: 'flex', justifyContent: 'end', color: 'black' }}
    >
      <Button
        component={Link}
        to='/'
        size='small'
        sx={{ color: 'black', p: 0, m: 0, justifyContent: 'end' }}
      >
        <CloseIcon />
      </Button>
    </Box>
  )
}
