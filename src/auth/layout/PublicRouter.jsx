import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from '../../common/store/config'

export const PublicRouter = () => {
  const auth = useAppSelector((state) => state.auth.user)

  if ((auth.status === 'not-authenticated' || auth.status === 'checking')) {
    return <Outlet />
  }

  if (auth.status === 'authenticated' && auth.token) {
    return <Navigate to='/client/dashboard' />
  }

  return !auth.token && <Navigate to={`/date/${auth.user.uid}`} />
}
