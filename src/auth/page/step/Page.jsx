import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Container, Grid, LinearProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'

import { useForm } from 'react-hook-form'
import { FadeIn } from '../../../common/style/fade/fade-in.style'
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7 } from './models'
import { Link } from 'react-router-dom'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { db, auth } from '../../../service/firebase'
import { useAppDispatch, useAppSelector } from '../../../common/store/config'
import { updatePhoto, validationAuthenticated } from '../../store/slice/sliceAuth'
import { updateProfile } from 'firebase/auth'
import { useTranslation } from 'react-i18next'

export const Page = () => {
  const { t } = useTranslation()

  const user = useAppSelector(state => state.auth.user)

  const dispatch = useAppDispatch()
  const components = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

  const [step, setStep] = useState(0)
  const [showComponent, setShowComponent] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    unregister,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })

  useEffect(() => {
    setShowComponent(true)
  }, [])

  const CurrentStepComponent = components[step]

  const onSubmit = async (data) => {
    if (step < components.length - 1) {
      setShowComponent(false)
      setShowComponent(true)
      setTimeout(() => {
        setStep((prevStep) => prevStep + 1)
      }, 300)
    } else {
      const storage = getStorage()

      try {
        setLoading(() => true)
        let downloadURL
        const file = data.selectedImageProfile ?? null

        if (file) {
          const filename = `${user.user.uid}-${file.name}-${crypto.randomUUID()}`
          const storageRef = ref(storage, `images/${filename}`)
          await uploadBytes(storageRef, file)
          downloadURL = await getDownloadURL(storageRef)
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL
          })
        } else {
          await updateProfile(auth.currentUser, {
            photoURL: 'https://i.ibb.co/LzH1xPp/6f57760966a796644b8cfb0fbc449843.png'
          })
          downloadURL = 'https://i.ibb.co/LzH1xPp/6f57760966a796644b8cfb0fbc449843.png'
        }

        delete data.selectedImageProfile
        delete data.token

        await setDoc(doc(db, 'profile', user.user.uid), {
          ...data
        })

        const userRef = doc(db, 'users', user.user.uid)
        await updateDoc(userRef, {
          auth: true,
          photo: downloadURL
        })

        await setDoc(doc(db, 'userChats', user.user.uid), {})
        await setDoc(doc(db, 'online', user.user.uid), {
          online: true
        })

        dispatch(updatePhoto(downloadURL))
        dispatch(validationAuthenticated())
      } catch (error) {
        console.error('Error al guardar el archivo en Firebase Storage o actualizar los documentos:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const progress = ((step + 1) / (components.length)) * 100

  const handleBackArrow = () => {
    if (step >= 1) {
      setStep(data => data - 1)
    }
  }

  return (
    <Container maxWidth='sm'>
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Button type='button' onClick={handleBackArrow} sx={{ color: 'black' }}>
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button sx={{ color: 'black' }} to='/' component={Link}>
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
      <LinearProgress
        variant='determinate'
        value={progress}
        color='secondary'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {showComponent && CurrentStepComponent && (
          <FadeIn
            key={step}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <CurrentStepComponent
              register={register}
              unregister={unregister}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </FadeIn>
        )}
        <Button
          sx={{ mt: 4, p: 1.4, textTransform: 'none', fontSize: '19px' }}
          color='secondary'
          size='large'
          fullWidth
          variant='contained'
          type='submit'
          disabled={!isValid || loading}
        >
          {loading
            ? (
              <CircularProgress size={24} color='secondary' />
              )
            : (
              <div>{step === components.length - 1 ? t('Register.Steps.Button.Send') : t('Register.Steps.Button.Next')}</div>
              )}
        </Button>
      </form>
    </Container>
  )
}
