import { Box, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { useAppSelector } from '../../../../common/store/config'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'

import { Timestamp, arrayUnion, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { db } from '../../../../service/firebase'

import { AudioRecorder } from './AudioRecorder'
import { useTranslation } from 'react-i18next'

const InputsSect = styled.div`
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid gray;

  input{
    width: 100%;
    height: 100%;
    outline: none;
    font-size: 18px;
    color: #2f2d52;

    &::placeholder{
      color: lightgray;
    }
  }
`

const Inputs = ({ roomId }) => {
  const { t } = useTranslation()

  const uid = useAppSelector(state => state.auth.user.user.uid)
  const uidFriend = useAppSelector(state => state.client.chat.friend.uid)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    reset,
    control,
    setValue
  } = useForm({ mode: 'all' })

  const eventSubmit = async (data) => {
    const storage = getStorage()
    setLoading(true)

    try {
      if (selectedFile) {
        const filename = `${uid}-${selectedFile.name}-${crypto.randomUUID()}`
        const storageRef = ref(storage, `images/${filename}`)
        await uploadBytes(storageRef, selectedFile)
        const downloadURL = await getDownloadURL(storageRef)

        await updateDoc(doc(db, 'chats', roomId), {
          messages: arrayUnion({
            id: crypto.randomUUID(),
            text: data.message,
            senderId: uid,
            date: Timestamp.now(),
            img: downloadURL
          })
        })
      } else {
        if (data.message !== '') {
          await updateDoc(doc(db, 'chats', roomId), {
            messages: arrayUnion({
              id: crypto.randomUUID(),
              text: data.message,
              senderId: uid,
              date: Timestamp.now()
            })
          })
        }
      }

      await updateDoc(doc(db, 'userChats', uid), {
        [roomId + '.lastMessage']: {
          text: data.message,
          uid
        },
        [roomId + '.date']: serverTimestamp()
      })

      await updateDoc(doc(db, 'userChats', uidFriend), {
        [roomId + '.lastMessage']: {
          text: data.message,
          uid
        },
        [roomId + '.date']: serverTimestamp()
      })

      setSelectedFile(null)
    } catch (error) {
      console.error('Error al agregar el mensaje:', error)
    } finally {
      const writingCollectionRef = collection(db, 'writingCollection')
      const docRef = doc(writingCollectionRef, roomId)
      setDoc(docRef, {
        writing: false,
        uid: ''
      })

      setLoading(false)
      reset()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setValue('file', file)
  }

  const handleInputChange = (e) => {
    const msg = e.target.value
    setValue('message', msg)
    const writingCollectionRef = collection(db, 'writingCollection')
    const docRef = doc(writingCollectionRef, roomId)
    setDoc(docRef, {
      writing: msg.length > 2,
      uid
    })
  }

  return (
    <form onSubmit={handleSubmit(eventSubmit)}>
      <InputsSect>
        <div style={{ marginBottom: '10px' }}>
          {selectedFile && (
            <div>
              <p>{t('Chat.Inputs.Img')}</p>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Vista previa'
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        <Controller
          control={control}
          rules={{
            required: true
          }}
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              maxLength={200}
              type='text'
              onChange={handleInputChange}
              placeholder={t('Chat.Inputs.Placeholder')}
              value={value}
            />
          )}
          name='message'
        />
        <AudioRecorder roomId={roomId} uid={uid} uidFriend={uidFriend} />

        <Box sx={{ display: 'flex' }}>
          <input
            type='file'
            style={{ display: 'none' }}
            id='file'
            onChange={handleFileChange}
            name='file'
          />
          <label htmlFor='file' style={{ cursor: 'pointer', margin: 0, padding: 0, height: '21px' }}>
            <AttachFileIcon />
          </label>
        </Box>
        <Button
          disabled={loading}
          variant='contained'
          color='secondary'
          type='submit'
        >
          {
            loading ? <CircularProgress size={24} color='secondary' /> : <SendIcon />
          }
        </Button>
      </InputsSect>
    </form>
  )
}

export default Inputs
