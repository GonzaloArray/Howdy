import React from 'react'
import { ContainerFlexCenter } from '../../common/style/container/ContainerFlexCenter'
import { Avatar, Typography } from '@mui/material'

import HowDy from '../../assets/Howdy.svg'

export const LogoDescription = ({ title }) => {
  return (
    <ContainerFlexCenter>
      <Avatar alt='Remy Sharp' src={HowDy} sx={{ width: 76, height: 76 }} />
      <Typography variant='h5' component='h2' color='black'>
        {title}
      </Typography>
    </ContainerFlexCenter>
  )
}
