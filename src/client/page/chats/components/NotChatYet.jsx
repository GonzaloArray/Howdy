import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Howdy from '../../../../assets/Howdy.svg'
import { useTranslation } from 'react-i18next'

export const NotChatYet = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

      <Avatar src={Howdy} alt='Howdy' />
      <Typography variant='h4' p={2}>{t('Chat.NotChat.Title')}</Typography>
      <Typography variant='body1' p={2}>{t('Chat.NotChat.Subtitle')}.</Typography>
    </Box>
  )
}
