import { Container } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ModalLogin } from '../../components/ModalLogin'
import { useAuth } from '../../hook/useAuth'
import { useAppSelector } from '../../../common/store/config'
import { AlertError } from '../../../common/components/AlertError'

export const Page = () => {
  const { userLogin } = useAuth()

  const auth = useAppSelector(state => state.auth.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })

  const eventSubmit = (data) => {
    userLogin(data)
  }

  return (
    <Container maxWidth='sm' sx={{ marginTop: 2 }}>
      <ModalLogin
        register={register}
        submit={handleSubmit}
        errors={errors}
        event={eventSubmit}
        isValid={isValid}
      />
      <AlertError error={auth.error} errorMessage={auth.errorMessage} />
    </Container>
  )
}
