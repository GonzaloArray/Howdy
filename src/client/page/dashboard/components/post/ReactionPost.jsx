import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
/* import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined' */
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { useTranslation } from 'react-i18next'

export const ReactionPost = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, width: '100%' }}
    >
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'none',
          color: 'black'
        }}
      >
        {/* <PlayCircleFilledWhiteOutlinedIcon fontSize='large' />
        <Typography>{t('HomeLog.Post.React.Listen')}</Typography>
      </Button>
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'none',
          color: 'black'
        }}
      > */}
        <FavoriteBorderOutlinedIcon fontSize='large' />
        <Typography>{t('HomeLog.Post.React.Like')}</Typography>
      </Button>
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'none',
          color: 'black'
        }}
      >
        <CommentOutlinedIcon fontSize='large' />
        <Typography>{t('HomeLog.Post.React.Comment')}</Typography>
      </Button>
    </Box>
  )
}
