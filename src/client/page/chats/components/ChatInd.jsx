import { Avatar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../common/store/config'
import { userFriendSelect } from '../../../store/slice/sliceChat'
import { ChatIndContainer } from '../style/ChatInd.style'
import { truncateText } from '../../../helpers/truncateText'
import { formatDate } from '../../../helpers/formDate'
import { useEffect, useState } from 'react'
import { db } from '../../../../service/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { StyledBadge } from '../style/StyledBadge.style'
import { Spinner } from '../../chat/style/Spinner.style'

export const ChatInd = ({ data }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user.user)
  const [online, setOnline] = useState(null)
  const [writing, setWriting] = useState({
    user: '',
    writing: false,
    uid: ''
  })

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'writingCollection', data[0]), async (on) => {
      if (on.data().writing) {
        const docRef = doc(db, 'users', on.data().uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setWriting({
            user: user.uid === on.data().uid ? 'Tú' : docSnap.data().name,
            writing: on.data().writing,
            uid: on.data().uid
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

  const handleClick = (user) => {
    dispatch(userFriendSelect(user))
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'online', data[1]?.userInfo?.uid), (doc) => {
      setOnline(doc?.data()?.online)
    })

    return () => unsub()
  }, [])

  const text = data[1]?.lastMessage?.text ? truncateText(data[1]?.lastMessage?.text, 25) : ''

  const owner = data[1]?.lastMessage?.uid === user.uid ? 'You: ' : ''

  return (
    <ChatIndContainer color='secondary' to={`${data[0]}`} onClick={() => handleClick(data[1]?.userInfo)} component={Link}>
      <div className='userImg'>
        <StyledBadge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          isOnline={online}
        >
          <Avatar src={data[1]?.userInfo?.photoURL ? data[1]?.userInfo?.photoURL : null} />
        </StyledBadge>
      </div>
      <div className='chatInfo'>
        <div className='userChatInfo'>
          <span>{data[1]?.userInfo?.displayName ? data[1]?.userInfo?.displayName : null}</span>
          <Typography variant='body2'>
            {
              user.uid !== writing.uid && writing.uid !== ''
                ? (
                  <Spinner class='spinner'>
                    <div class='bounce1' />
                    <div class='bounce2' />
                    <div class='bounce3' />
                  </Spinner>
                  )
                : (
                  <>
                    {owner} {text}
                  </>
                  )
            }

          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'end' }}>{formatDate(data[1]?.date?.seconds, data[1]?.date?.nanoseconds)}</Typography>
        </div>
      </div>

    </ChatIndContainer>
  )
}
