import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../../../../service/firebase'
import { Button } from '@mui/material'
import { useAppSelector } from '../../../../../common/store/config'

export const ButtonModalAcceptFriend = ({ combineID, idFriend, children, setModal }) => {
  const [loading, setLoading] = useState(false)
  const currentUserUid = useAppSelector(state => state.auth.user.user.uid)

  const handleConfirmRequestFriend = async (friendId) => {
    try {
      setLoading(true)
      const friendRequestsRef = doc(
        db,
        'friendRequests',
        combineID
      )
      await setDoc(friendRequestsRef, { status: 'accepted', acceptedBy: currentUserUid }, { merge: true })

      const friendsRef = collection(db, 'friends')
      await setDoc(friendsRef, {
        [currentUserUid]: true,
        [friendId]: true
      })
    } catch (error) {
      console.error('Error al aceptar la solicitud de amistad:', error)
    } finally {
      setLoading(false)
      setModal(false)
    }
  }
  return (
    <Button disabled={loading} onClick={() => handleConfirmRequestFriend(idFriend)}>{children}</Button>
  )
}
