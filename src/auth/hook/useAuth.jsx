import { useAppDispatch } from '../../common/store/config'
import { authenticatedLogout, loginAuthentication, registerAuthentication, registerAuthenticationGoogle } from '../store/thunk/thunk'

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const userLogin = (data) => {
    dispatch(loginAuthentication(data))
  }

  const userRegister = (data) => {
    dispatch(registerAuthentication(data))
  }

  const userRegisterWithGoogle = () => {
    dispatch(registerAuthenticationGoogle())
  }

  const userLogout = (id) => {
    dispatch(authenticatedLogout(id))
  }

  return {
    userRegister,
    userRegisterWithGoogle,
    userLogout,
    userLogin
  }
}
