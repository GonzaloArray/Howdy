import { Box, Typography } from '@mui/material'
import React from 'react'

export const Title = ({ title, description }) => {
  return (
    <Box component='div' my={3}>
      <Typography variant='h5' component='h2'>{title}</Typography>
      <Typography mt={1} fontSize='15px' variant='h6' component='h3'>{description}</Typography>
    </Box>
  )
}
