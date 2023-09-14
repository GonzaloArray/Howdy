import { Grid, IconButton, Typography } from '@mui/material'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Text = styled(Typography)`
  word-wrap: break-word;
`

export const CommentRecentUser = ({ comments }) => {
  return (
    <>
      {comments?.map(c => (
        <Grid container key={c.id} sx={{ p: 2 }}>
          <Grid item xs={11}>
            <Text variant='body1'>{c.msg}</Text>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  )
}
