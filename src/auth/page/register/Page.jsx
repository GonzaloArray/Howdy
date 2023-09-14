import { Container, Grid, TextField } from '@mui/material'

import { InputPassword } from '../../components/InputPassword'
import { Separator } from '../../components/Separator'
import { CloseAction } from '../../components/CloseAction'
import { AccountDescription } from '../../components/AccountDescription'
import { useForm } from 'react-hook-form'
import { LogoDescription } from '../../components/LogoDescription'
import { useAuth } from '../../hook/useAuth'
import { useAppSelector } from '../../../common/store/config'
import { ButtonFirebase } from '../../components/ButtonFirebase'
import { GoogleSVG } from '../../icon/GoogleSVG'
import { ButtonSubmit } from '../../components/ButtonSubmit'
import { useTranslation } from 'react-i18next'

export const Page = () => {
  const { t } = useTranslation()

  const { userRegister, userRegisterWithGoogle } = useAuth()
  const auth = useAppSelector((state) => state.auth.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })

  const eventSubmit = (data) => {
    userRegister(data)
  }

  return (
    <Container maxWidth='sm' sx={{ marginTop: 2 }}>
      <CloseAction />
      <LogoDescription title={t('Register.Title')} />
      <form onSubmit={handleSubmit(eventSubmit)}>
        <TextField
          id='name'
          label={t('Register.Name')}
          variant='standard'
          margin='normal'
          fullWidth
          color='secondary'
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && 'Este campo es requerido'}
        />
        <TextField
          id='email'
          label={t('Register.Email')}
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
        <ButtonSubmit title={t('Register.Button.Create')} isValid={isValid} status={auth.status} />
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
        path='/auth/login'
        title={t('Register.DoYou')}
        linkName={t('Register.Button.SignIn')}
      />
    </Container>
  )
}
