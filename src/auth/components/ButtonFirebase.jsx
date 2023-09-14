import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export const ButtonFirebase = ({ title, icon, click, status }) => {
  return (
    <Grid item xs={12}>
      <Button
        onClick={() => click()}
        size='large'
        fullWidth
        variant='outlined'
        sx={{ p: '13px' }}
        disabled={status === 'checking'}
        color='primary'
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', textTransform: 'none', gap: 1 }}
        >
          <Box>
            {icon}
          </Box>
          <Box>
            {status === 'checking'
              ? (
                <CircularProgress size={24} color='secondary' />
                )
              : (
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }} component='h2'>{title}</Typography>
                )}
          </Box>
        </Box>
      </Button>
    </Grid>
  )
}
