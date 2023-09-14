import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const AccountDescription = ({ title, path, linkName }) => {
  return (
    <Grid container columnSpacing={0.4} mt={4}>
      <Grid item xs={7} color='black' display='flex' justifyContent='center' alignItems='center'>
        <Typography fontSize='14px' variant='h6' component='h2'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Button
          component={Link}
          to={path}
          size='small'
          color='secondary'
          sx={{
            textTransform: 'none',
            fontSize: '15px',
            fontWeight: 'bold',
            p: '0',
            m: 0,
            borderBottom: '2px solid violet',
            textDecoration: 'none',
            borderRadius: 0
          }}
        >
          {linkName}
        </Button>
      </Grid>
    </Grid>
  )
}
