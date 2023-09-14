import { Avatar, Box, Button, Grid, Divider } from '@mui/material'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

import styled from '@emotion/styled'

/* import { useAppSelector } from '../../../../../common/store/config'
import { ButtonAddFriend } from './ButtonAddFriend' */
import { LangBadgePost } from './LangBadgePost'
import { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../../service/firebase'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

export const HeaderPost = ({ name, photo, idUser }) => {
  const GridStyled = styled(Grid)`

  font-family: 'Nunito Sans', sans-serif;

  .profile-name{
    font-weight: bold;
    font-size: 0.875rem;
  }

  .post-info{
    color: 484848;
    font-weight: 500;
  }

  .flags{
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .divider-flags{
      margin: 0 0.27rem;
    }
  }

  .learn{
        background-color: #F6E7F1;
        border-color: #9C2272;
    }
`
  const [data, setData] = useState()

  useEffect(() => {
    const handleGetData = async () => {
      const docRef = doc(db, 'profile', idUser)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    }

    const fetchData = async () => {
      const data = await handleGetData()
      setData(data)
    }

    fetchData()
  }, [])

  const { t } = useTranslation()

  return (
    <Grid container>
      <GridStyled item xs={11}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Link to={`/client/dashboard/profile/${idUser}`}>
            <Avatar src={photo || null} />
          </Link>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Link to={`/client/dashboard/profile/${idUser}`}>
              <h2 className='profile-name'>{name}</h2>
            </Link>
            <div className='flags'>
              <LangBadgePost img={data?.selectorLan.photo} />
              <Divider orientation='vertical' variant='middle' className='divider-flags' />
              <LangBadgePost img={data?.selectorLanguage.photo} variant='learn' />
            </div>
            {/* <h3 className='post-info'>1 {t('HomeLog.Post.Modal.TimeEdit')}</h3> */}
            {/* {idUser !== currentUserUid && (
              <ButtonAddFriend
                idUser={idUser}
                currentUserUid={currentUserUid}
              />
            )}
            */}
          </Box>
        </Box>
      </GridStyled>
      <Grid item xs={1}>
        <Button sx={{ color: 'black' }}>
          <MoreHorizRoundedIcon />
        </Button>
      </Grid>
    </Grid>
  )
}
