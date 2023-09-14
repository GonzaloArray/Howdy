import { styled } from 'styled-components'
import { ChatInd } from './ChatInd'
import { useState, useEffect } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../service/firebase'
import { useAppSelector } from '../../../../common/store/config'

const UserChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  height: 70vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

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

const Chat = () => {
  const [chats, setChats] = useState([])
  const user = useAppSelector((state) => state.auth.user.user)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', user.uid), (doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    user.uid && getChats()
  }, [user.uid, db])

  return (
    <UserChatContainer>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <ChatInd
            key={chat[0]}
            data={chat}
          />
        ))}
    </UserChatContainer>
  )
}

export default Chat
