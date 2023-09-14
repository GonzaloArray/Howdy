import React from 'react'
import { useAppSelector } from '../../common/store/config'
import { Navigate, Outlet } from 'react-router-dom'

export const UserTokenAuth = () => {
  const auth = useAppSelector((state) => state.auth.user.token)

  return (!auth) ? <Outlet /> : <Navigate to='/' />
}
