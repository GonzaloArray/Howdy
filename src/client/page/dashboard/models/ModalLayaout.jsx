import { Box, Modal, Stack, Typography } from '@mui/material'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../service/firebase'
import { useAppSelector } from '../../../../common/store/config'
import { FriendRequest } from '../components/modal/FriendRequest'
import { useTranslation } from 'react-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export const ModalLayaout = ({ open, close, setNotification, setModal }) => {
  const { t } = useTranslation()

  const user = useAppSelector(state => state.auth.user.user)
  const [requestFriend, setRequestFriend] = useState([])

  const getUserData = async (db, userId) => {
    const userRef = doc(db, 'users', userId)
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
      return userSnapshot.data()
    }

    return null
  }

  const getPendingFriendRequests = async (db, userUid) => {
    const q = query(
      collection(db, 'friendRequests'),
      where('status', '==', 'pending'),
      where('receiver', '==', userUid)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const requestsData = await getPendingFriendRequests(db, user.uid)

      const requestsWithSenderData = await Promise.all(
        requestsData.map(async (request) => {
          const senderData = await getUserData(db, request.sender)
          if (senderData) {
            return { ...request, senderData }
          }
          return null
        })
      )

      const validRequests = requestsWithSenderData.filter((request) => request !== null)

      setRequestFriend(validRequests)
      setNotification(validRequests?.length)
    }

    fetchData()

    const friendRequestsQuery = query(
      collection(db, 'friendRequests'),
      where('status', '==', 'pending'),
      where('receiver', '==', user.uid)
    )

    const unsubscribe = onSnapshot(friendRequestsQuery, () => {
      fetchData()
    })

    return () => unsubscribe()
  }, [db, user.uid])

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2' mb={4}>
          {t('Header.Notif.Title')}
        </Typography>
        <Stack spacing={2}>
          {
            requestFriend?.length
              ? <FriendRequest setModal={setModal} requestFriend={requestFriend} />
              : <Typography>{t('Header.Notif.Empty')}</Typography>
          }
        </Stack>
      </Box>
    </Modal>
  )
}
