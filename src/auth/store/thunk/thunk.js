import {
  onAuthenticatedAutomatic,
  onGoogleAuth,
  onLogout,
  signIn,
  signUp
} from '../../../service/firebaseAuth'

import {
  checkingCredentials,
  login,
  loginError,
  logout,
  reset
} from '../slice/sliceAuth'

export const loginAuthentication = (data) => async (dispatch) => {
  const { email, password } = data

  dispatch(checkingCredentials())

  const result = await signIn(email, password)

  if (result.success) {
    dispatch(login(result.userFirebase))
  } else {
    dispatch(loginError(result.error))
  }
}

export const registerAuthentication = (data) => async (dispatch) => {
  const { email, password, name } = data

  dispatch(checkingCredentials())

  const result = await signUp(email, password, name)

  if (result.success) {
    dispatch(login(result.userFirebase))
  } else {
    dispatch(loginError(result.error))
  }
}

export const registerAuthenticationGoogle = () => async (dispatch) => {
  dispatch(checkingCredentials())

  const result = await onGoogleAuth()

  if (result.success) {
    dispatch(login(result.userFirebase))
  } else {
    dispatch(loginError(result.error))
  }
}

export const autheticatedAutomatic = () => async (dispatch) => {
  dispatch(checkingCredentials())

  const result = await onAuthenticatedAutomatic()

  if (result.success) {
    dispatch(login(result.userFirebase))
  } else {
    if (!result.success) {
      dispatch(reset())
    } else {
      dispatch(loginError(result.error))
    }
  }
}

export const authenticatedLogout = (id) => (dispatch) => {
  dispatch(checkingCredentials())
  onLogout(id)
  dispatch(logout())
}
