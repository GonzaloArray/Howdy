import { CircularProgress } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../common/store/config'

export const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth.user.status)
  console.log(auth)
  if (auth === 'checking') {
    return <CircularProgress size={24} color='secondary' />
  }

  if (auth === 'not-authenticated') {
    return <Navigate to='/auth/' />
  }

  return auth === 'authenticated' && <Outlet />
}
