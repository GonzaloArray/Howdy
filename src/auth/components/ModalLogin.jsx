import React from 'react'
import { CloseAction } from './CloseAction'
import { LogoDescription } from './LogoDescription'
import { Grid, TextField } from '@mui/material'
import { InputPassword } from './InputPassword'
import { Separator } from './Separator'
import { AccountDescription } from './AccountDescription'
import { ButtonFirebase } from './ButtonFirebase'
import { useAuth } from '../hook/useAuth'
import { GoogleSVG } from '../icon/GoogleSVG'
import { useAppSelector } from '../../common/store/config'
import { ButtonSubmit } from './ButtonSubmit'
import { useTranslation } from 'react-i18next'

export const ModalLogin = ({ register, submit, errors, event, isValid }) => {
  const { t } = useTranslation()

  const auth = useAppSelector((state) => state.auth.user)
  const { userRegisterWithGoogle } = useAuth()

  return (
    <>
      <CloseAction />
      <LogoDescription title={t('Login.Title')} />
      <form onSubmit={submit(event)}>
        <TextField
          id='email'
          label={t('Login.Email')}
          variant='standard'
          type='email'
          margin='normal'
          fullWidth
          color='secondary'
          autoComplete='current-password'
          error={!!errors.email}
          {...register('email', { required: true })}
          helperText={errors.email && t('Error.ErrorReq')}
        />
        <InputPassword register={register} errors={errors} />
        <ButtonSubmit title={t('Login.Button.SignIn')} isValid={isValid} status={auth.status} />
      </form>
      <Separator />
      <Grid container spacing={2} mt={1}>
        <ButtonFirebase
          click={userRegisterWithGoogle}
          title={t('Login.Button.Google')}
          icon={<GoogleSVG />}
          status={auth.status}
        />
      </Grid>
      <AccountDescription
        path='/auth/register'
        title={t('Login.DoYou')}
        linkName={t('Login.Button.Register')}
      />
    </>
  )
}
