import { Route, Routes, Navigate } from 'react-router-dom'

import { Page as Login } from './auth/page/login/Page'
import { Page as Register } from './auth/page/register/Page'
import { Page as Chats } from './client/page/chats/Page'
import { Page as Chat } from './client/page/chat/Page'
import { Page as Home } from './client/page/home/Page'
import { Page as Dashboard } from './client/page/dashboard/Page'
import { Page as Profile } from './client/page/profile/Page'
import { Page as Blog } from './client/page/blog/Page'
import { LayoutDashboard } from './client/page/dashboard/layout/LayoutDashboard'
import { Page as Step } from './auth/page/step/Page'
import { PublicRouter } from './auth/layout/PublicRouter'
import { PrivateRoute } from './auth/layout/PrivateRoute'
import { useEffect } from 'react'
import { autheticatedAutomatic } from './auth/store/thunk/thunk'
import { useAppDispatch } from './common/store/config'
import { UserTokenAuth } from './auth/layout/UserTokenAuth'

function App () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(autheticatedAutomatic())
  }, [])

  return (
    <>
      <Routes>
        <Route path='auth/*' element={<PublicRouter />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='' exact element={<LayoutDashboard />}>
            <Route path='blog' element={<Blog />} />
            <Route index exact element={<Home />} />
          </Route>
          <Route path='*' element={<Navigate to='auth/' />} />
        </Route>
        <Route path='client/*' exact element={<PrivateRoute />}>
          <Route path='dashboard/*' element={<LayoutDashboard />}>
            <Route path='chats/*' element={<Chats />}>
              <Route path=':chat' element={<Chat />} />
            </Route>
            <Route path='profile/:id' element={<Profile />} />
            <Route index exact element={<Dashboard />} />
          </Route>
          <Route path='*' element={<Navigate to='client/dashboard' />} />
        </Route>
        <Route path='date' element={<UserTokenAuth />}>
          <Route path=':token' element={<Step />} />
        </Route>
        <Route path='*' element={<Navigate to='auth/' />} />
      </Routes>
    </>
  )
}

export default App
