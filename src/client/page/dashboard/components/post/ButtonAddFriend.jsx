import React, { useState, useEffect } from 'react'
import { db } from '../../../../../service/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import { PersonAddAlt1 } from '@mui/icons-material'

export const ButtonAddFriend = ({ idUser, currentUserUid }) => {
  const { t } = useTranslation()

  const [isRequestPending, setIsRequestPending] = useState({ value: null, title: null })
  const combineID = currentUserUid > idUser ? currentUserUid + idUser : idUser + currentUserUid

  useEffect(() => {
    const checkFriendRequest = async () => {
      const docRef = doc(db, 'friendRequests', combineID)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const q = query(
          collection(db, 'friendRequests'),
          where('status', '==', 'accepted')
        )

        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          setIsRequestPending({ value: 'friend', title: t('HomeLog.Post.Modal.Friend') })
        } else {
          setIsRequestPending({ value: 'pending', title: t('HomeLog.Post.Modal.Pending') })
        }
      } else {
        setIsRequestPending({ value: 'not_friend', title: t('HomeLog.Post.Modal.NotFriend') })
      }
    }
    checkFriendRequest()
  }, [idUser, currentUserUid, db])

  const handleAddFriend = async (friendId) => {
    try {
      const friendRequestsRef = doc(
        db,
        'friendRequests',
        combineID
      )
      await setDoc(friendRequestsRef, {
        sender: currentUserUid,
        receiver: friendId,
        status: 'pending',
        chat: false,
        createdAt: serverTimestamp()
      })
      setIsRequestPending({ value: 'pending', title: t('HomeLog.Post.Modal.NotFriend') })
    } catch (error) {
      console.error('Error al enviar la solicitud de amistad:', error)
    }
  }
  return (
    <>
      <btn
        disabled={isRequestPending?.value === 'friend' || isRequestPending?.value === 'pending'}
        onClick={() => handleAddFriend(idUser)}
        className='interact'
      >
        <PersonAddAlt1 />
      </btn>

    </>
  )
}
