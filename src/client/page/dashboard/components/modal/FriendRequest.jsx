import { Avatar, Grid, Paper, Typography, styled } from '@mui/material'
import React from 'react'
import { ButtonModalAcceptFriend } from './ButtonModalAcceptFriend'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'space-between'
}))

export const FriendRequest = ({ requestFriend, setModal }) => {
  return (
    <>
      {requestFriend?.map(f => (
        <Item key={f?.sender}>
          <Grid container alignItems='center'>
            <Grid item xs={8} display='flex' gap={2} alignItems='center'>
              <Avatar src={f?.senderData?.photo} />
              <Typography variant='body1'>{f.senderData?.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <ButtonModalAcceptFriend setModal={setModal} combineID={f?.id} idFriend={f?.sender}>
                Agregar a amigo
              </ButtonModalAcceptFriend>
            </Grid>
          </Grid>
        </Item>
      ))}
    </>
  )
}
