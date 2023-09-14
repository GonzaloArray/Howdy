import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { useAppSelector } from '../../../../common/store/config'
import { formatDate } from '../../../helpers/formDate'

const MessageSect = styled.div`
  display: flex;
  gap: 30px;
  align-items: end;

  &.owner {
    flex-direction: row-reverse;
    white-space: pre-wrap;

    p {
      border: 1px solid #707c9740;
      background-color: none;
      border-radius: 7px 7px 0 7px;
      white-space: pre-wrap;
      width: 100%;
    }
  }
`

const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: gray;
  align-items: center;
  font-weight: 300;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;

  p {
    background-color: #c32b8f2b;
    padding: 10px 20px;
    border-radius: 0 7px 7px 7px;
    max-width: max-content;
    overflow: hidden;
    word-wrap: break-word;
  }
`

const Message = ({ message }) => {
  const userFriend = useAppSelector((state) => state.client.chat.friend)
  const userOwner = useAppSelector((state) => state.auth.user.user)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <MessageSect
      ref={ref}
      className={message.senderId === userOwner.uid ? 'owner' : ''}
    >
      <MessageInfo>
        <Avatar
          src={
            message.senderId === userOwner.uid
              ? userOwner.photo
              : userFriend.photo
          }
        />
        <Typography variant='body2' mt={1}>
          {formatDate(message?.date?.seconds, message?.date?.nanoseconds)}
        </Typography>
      </MessageInfo>
      <MessageContent>
        {message.img && (
          <Box
            sx={{
              width: 300,
              height: 300
            }}
          >
            <img src={message.img} alt='' />
          </Box>
        )}
        {message.audio && <audio controls src={message.audio} />}
        {message.text !== '' && <Typography mb={1}>{message.text}</Typography>}
      </MessageContent>
    </MessageSect>
  )
}

export default Message
