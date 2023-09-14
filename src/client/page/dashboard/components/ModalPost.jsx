import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../common/store/config'
import PanoramaIcon from '@mui/icons-material/Panorama'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../../service/firebase'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 650,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

export const ModalPost = ({ open, close, setModal }) => {
  const user = useAppSelector((state) => state.auth.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })

  const eventSubmit = async (data) => {
    try {
      const newDocRef = doc(collection(db, 'comment'))
      const docRef = doc(db, 'profile', user.user.uid)
      const docSnap = await getDoc(docRef)

      const lan = {
        native: '',
        learning: ''
      }

      if (docSnap.exists()) {
        lan.native = docSnap.data().selectorLan.value
        lan.learning = docSnap.data().selectorLanguage.value
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }

      await setDoc(newDocRef, {
        ...data,
        photo: user.user.photo,
        name: user.user.name,
        idUSer: user.user.uid,
        lanNative: lan.native,
        lanLearning: lan.learning,
        timestamp: serverTimestamp()
      })

      reset()
      setModal(false)
    } catch (error) {
      console.error('Error al enviar el comentario a Firebase:', error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(eventSubmit)}>
          <Grid container>
            <Grid item xs={11}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar src={user.user.photo} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>{user.user.name}</Typography>
                  <Typography variant='body2'>Publicar para todos</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => setModal(false)}>
                <CloseIcon fontSize='large' />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              color='secondary'
              id='selectComment'
              name='selectComment'
              label='Comentario'
              multiline
              {...register('selectComment', { required: true })}
              rows={10}
              inputProps={{
                maxLength: 200
              }}
              placeholder='¿Sobre qué quieres hablar?'
              error={!!errors.selectComment}
              helperText={errors.selectComment && 'Este campo es requerido'}
            />
          </Grid>
          <Grid container my={2}>
            <Grid item xs={1}>
              <IconButton>
                <PanoramaIcon fontSize='large' />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton>
                <VideoCameraBackIcon fontSize='large' />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button
              sx={{ fontSize: '1rem', letterSpacing: '.19rem', fontWeight: 'bold' }}
              size='large'
              color='secondary'
              type='submit'
              variant='contained'
              disabled={!isValid}
            >
              Publicar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
