import { useEffect, useRef } from 'react'
import Message from './Message'
import { styled } from 'styled-components'
import { db } from '../../../../service/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

import { useAppSelector } from '../../../../common/store/config'
import { Typography } from '@mui/material'

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  background-color: #f6f7d3fc;
  padding: 20px;
  height: 70vh;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #c2e9fb;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c70e7a;
    border-radius: 4px;
  }

  scrollbar-color: #59a3cc #c2e9fb;
`

const Messages = ({ messages, roomId, writing, setWriting }) => {
  const user = useAppSelector(state => state.auth.user.user)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'writingCollection', roomId), async (on) => {
      if (on.data().writing) {
        const docRef = doc(db, 'users', on.data().uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setWriting({
            user: user.uid === on.data().uid ? 'Tú' : docSnap.data().name,
            writing: on.data().writing,
            uid: on.data().uid,
            room: on.id
          })
        } else {
          setWriting({
            user: '',
            writing: false,
            uid: ''
          })
        }
      } else {
        setWriting({
          user: '',
          writing: false,
          uid: ''
        })
      }
    })
    return () => unsub()
  }, [db])

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [writing])

  return (
    <MessagesContainer>
      {messages?.map((m) => (
        <Message
          message={m} key={m.id}
          writing={writing}
        />
      ))}
      {
        writing.writing && <Typography ref={ref}>Escribiendo {writing.user} ...</Typography>
      }
    </MessagesContainer>
  )
}

export default Messages
