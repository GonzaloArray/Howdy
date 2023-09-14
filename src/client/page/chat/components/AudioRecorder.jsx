import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import React, { useState, useRef } from 'react'
import { db } from '../../../../service/firebase'
import StopIcon from '@mui/icons-material/Stop'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import { IconButton } from '@mui/material'

export const AudioRecorder = ({ roomId, uid, uidFriend }) => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = handleDataAvailable
        mediaRecorder.start()
        setIsRecording(true)
        mediaRecorderRef.current = mediaRecorder
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error)
      })
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const audioBlob = new Blob([event.data], { type: 'audio/wav' })
      uploadAudioToFirebase(audioBlob)
    }
  }

  const uploadAudioToFirebase = async (audioBlob) => {
    const storage = getStorage()

    const storageRef = ref(storage, 'audio_recordings/' + Date.now() + '.wav')

    try {
      const uploadTaskSnapshot = await uploadBytes(storageRef, audioBlob)
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref)

      await updateDoc(doc(db, 'chats', roomId), {
        messages: arrayUnion({
          id: crypto.randomUUID(),
          text: '',
          senderId: uid,
          date: Timestamp.now(),
          audio: downloadURL
        })
      })

      await updateDoc(doc(db, 'userChats', uid), {
        [roomId + '.lastMessage']: {
          text: '',
          uid
        },
        [roomId + '.date']: Timestamp.now()
      })

      await updateDoc(doc(db, 'userChats', uidFriend), {
        [roomId + '.lastMessage']: {
          text: '',
          uid
        },
        [roomId + '.date']: Timestamp.now()
      })
    } catch (error) {
      console.error('Error uploading audio to Firebase:', error)
    }
  }

  return (
    <div>
      {
        isRecording
          ? (
            <IconButton onClick={stopRecording} disabled={!isRecording}>
              <StopIcon />
            </IconButton>
            )
          : (
            <IconButton onClick={startRecording} disabled={isRecording}>
              <KeyboardVoiceIcon />
            </IconButton>
            )
      }

    </div>
  )
}
