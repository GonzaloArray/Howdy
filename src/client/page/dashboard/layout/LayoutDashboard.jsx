import { useEffect, useState } from 'react'

/* eslint-disable react/jsx-indent */
import { Link, Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { Divider, Badge, Avatar, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import chat from '../img/chat-icon.svg'
import saved from '../img/saved-icon.svg'
import notifications from '../img/notifications-icon.svg'
import arrow from '../img/arrow.svg'
import profileMobile from '../img/profile.svg'
import home from '../img/home.svg'
import savedMobile from '../img/saved-mobile.svg'
import chatMobile from '../img/chat-mobile.svg'
import LogoutIcon from '@mui/icons-material/Logout'

import { useAppSelector } from '../../../../common/store/config'
import { useAuth } from '../../../../auth/hook/useAuth'

import { primary, primary120 } from '../../../../common/variables'

import { useTranslation } from 'react-i18next'
import { ModalLayaout } from '../models/ModalLayaout'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .tablet-desktop {
    display: none;
    position: sticky;
    top: 0;

    z-index: 999;
    width: 100%;
    max-width: 1400px;
  }

  .menu-icon {
    z-index: 4;
    width: 2rem;
    height: 2rem;
  }

  .nav-menu {
    color: black;
    position: absolute;
    top: 0;
    right: 0;

    z-index: 0;

    min-width: 50vw;
    height: 100vh;

    padding: 8rem 3rem;

    opacity: 0;
    transition: all ease-in-out 1s;
    display: none;

    background-color: #ffffff;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      width: 100%;

      a{
        width: 100%;
        margin-bottom: 1rem;
      }

      li{
        width: 100%;
        margin-bottom: 1rem;
        select{
          padding: 0 1rem 0 0;
          background: url(${arrow}) no-repeat;

          background-size: 12px;
          background-position: calc(100%);
          background-repeat: no-repeat;

          margin-bottom: 1rem;
        }
      }
    }
  }

  .active {
    opacity: 1 !important;
    z-index: 2;
    display: block;
    
    position: fixed;
    right: 0;
    transition: all ease-in-out 1s;
  }

  .mobile-nav {
    position: fixed;
    width: 100%;
    bottom: 0;

    z-index: 100;

    background-color: white;

    ul {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 1rem 2rem;
      gap: 3rem;
      
    }
  }

  .icon-mobile{
    width: 25px;
  }

  .active-item{
    filter: invert(100%);
  }
  
  .active-bg{
    background-color: ${primary120};
    border-radius: 28px;
    padding: 0.4rem 1.5rem;
    text-align: center;
  }

  .btn {
    min-width: 150px;
    padding: 1rem 0;

    text-align: center;
    border-radius: 5px;
    font-weight: bold;
  }

  .login {
    border: 1px solid ${primary};
    color: ${primary};
  }

  .signup {
    border: 1px solid ${primary};
    background-color: ${primary};
    color: white;
  }

  .mobile {
    position: sticky;
    top: 0;
    width: 100%;

    z-index: 99;
  }

  .divider{
    background-color: #ff00a8;
  }



  @media screen and (min-width: 768px) {
    .tablet-desktop {
      display: block;
    }

    .mobile-nav {
      display: none;
    }

    .mobile {
      display: none;
    }
  }
`

const Header = styled.header`
  z-index: 3;

  background-color: white;

  padding: 24px 10px;

  width: 100%;
  height: 85px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: black;

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h2 {
      margin-right: 4rem;
    }

    img {
      max-width: 37.5px;
    }
  }

  nav {
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      gap: 1.5rem;
    }

    select {
      outline: none;
      padding: 0 1rem 0 0;

      background: url(${arrow}) no-repeat;

      background-size: 12px;
      background-position: calc(100%);
      background-repeat: no-repeat;
    }
  }

  .vertical {
    height: 2rem;
  }

  .auth-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .icon {
      object-fit: contain;
      width: 30px;
      height: 24px;
      transition: all ease-in-out 0.1s;

      &:hover{
        filter: brightness(0) saturate(100%) invert(62%) sepia(87%) saturate(326%) hue-rotate(36deg) brightness(101%) contrast(95%);
        transition: all ease-in-out 0.1s;
      }
    }
  }

  .no-auth {
    display: flex;

    gap: 1rem;
  }

  @media screen and (min-width: 768px) {
    height: 105px;
  }
`

const Main = styled.main`
  width: 100%;
`

const datos = [
  {
    name: 'Header.Blog',
    path: 'blog'
  },
  {
    name: 'Header.AboutUs',
    path: 'nosotros '
  }
]

const dataMobile = [
  {
    name: 'Header.Blog',
    path: 'blog'
  },
  {
    name: 'Header.AboutUs',
    path: 'nosotros '
  }
]

const menuAnimation = () => {
  const menu = document.querySelector('.nav-menu')
  menu.classList.toggle('active')
}

const selectedItem = (e) => {
  const icon = e.target
  const li = icon.closest('li')

  const imgs = document.querySelectorAll('.mobile-nav-ul .icon-mobile')
  const list = document.querySelectorAll('.mobile-nav-ul li')

  for (let index = 0; index < imgs.length; index++) {
    imgs[index].classList.remove('active-item')
    list[index].classList.remove('active-bg')
  }
  icon.classList.add('active-item')
  li.classList.add('active-bg')
}

export const LayoutDashboard = () => {
  const auth = useAppSelector((state) => state.auth.user)
  const { userLogout } = useAuth()
  const [modal, setModal] = useState(false)
  const [notification, setNotification] = useState(0)

  // i18next function to translate
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState('')

  useEffect(() => {
    // Obtiene el idioma actualmente seleccionado de i18next y actualiza el estado.
    setSelectedLanguage(i18n.language)
  }, [i18n.language])

  const handleLanguageSelect = (e) => {
    const selectedLanguage = e.target.value
    setSelectedLanguage(selectedLanguage)
    i18n.changeLanguage(selectedLanguage)
  }
  const { t } = useTranslation()

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleClick = () => {
    userLogout(auth.user.uid)
  }

  return (
    <Layout>
        <div className='tablet-desktop'>
          <Header>
            <div className='logo'>
              <Button to='/client/dashboard' component={Link}>
                <img alt='Howdy' src='/howdy-logo.svg' />
                <h2 style={{ color: 'black', marginLeft: 3 }}>Howdy</h2>
              </Button>

              <nav>
                <ul>
                  {datos.map((data, index) => {
                    return (
                      <Link key={index} to={data.path}>
                        <li>{t(data.name)}</li>
                      </Link>
                    )
                  })}
                  <select label='lang' value={selectedLanguage} onChange={handleLanguageSelect}>
                    <option value='es'>ES</option>
                    <option value='en'>EN</option>
                    <option value='pr'>PR</option>
                  </select>
                </ul>
              </nav>
            </div>

            {auth.status === 'authenticated'
              ? (
              <div className='auth-icons'>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleClick}
                  sx={{ py: 1.5 }}
                >
                <LogoutIcon />
                </Button>
                <Link to='chats'><img src={chat} className='icon' /></Link>
                <Link to='saved'><img src={saved} className='icon' /></Link>
                <IconButton onClick={() => setModal(true)}>
                <Badge badgeContent={notification} color='primary'>
                 <img src={notifications} className='icon' />
                </Badge>
                </IconButton>
                <Divider
                  orientation='vertical'
                  variant='middle'
                  className='vertical'
                />

                <Button to={`/client/dashboard/profile/${auth?.user.uid}`} component={Link}>
                  <Avatar alt='perfil' src={auth?.user.photo} />
                </Button>
              </div>
                )
              : (
              <div className='no-auth'>
                <Link to='/auth/login' className='login btn'>{t('Header.LogIn')}</Link>
                <Link to='/auth/register' className='signup btn'>{t('Header.SignUp')}</Link>
              </div>
                )}
          </Header>
        </div>

        <div className='mobile'>
          <Header>
            <div className='logo'>
              <img alt='Howdy' src='/howdy-logo.svg' />
            </div>
            <MenuIcon className='menu-icon' onClick={() => menuAnimation()} />
          </Header>
          <nav className='nav-menu'>
            <ul>
              <li>
                <select label='lang-mobile' onChange={handleLanguageSelect}>
                      <option value='es'>ES</option>
                      <option value='en'>EN</option>
                      <option value='pr'>PR</option>
                </select>
                <Divider className='divider' role='presentation' variant='fullWidth' />
              </li>
              {dataMobile.map((data, index) => {
                return (
                  <Link key={index} to={data.path}>
                    <li>{t(data.name)}</li>
                    <Divider className='divider' role='presentation' variant='fullWidth' />
                  </Link>
                )
              })}
              {
                auth.status === 'authenticated'
                  ? (
                    <>
                      <Link to={`/client/dashboard/profile/${auth?.user.uid}`}>
                        <li>{t('Perfil')}</li>
                        <Divider className='divider' role='presentation' variant='fullWidth' />
                      </Link>
                      <Button
                        type='button'
                        variant='contained'
                        color='secondary'
                        onClick={handleClick}
                        sx={{ py: 1.5 }}
                      >
                        <LogoutIcon />
                      </Button>

                    </>
                    )
                  : (
                      <>
                        <Link to='/auth/login'>
                          <li>{t('Header.LogIn')}</li>
                          <Divider className='divider' role='presentation' variant='fullWidth' />
                        </Link>
                        <Link to='/auth/register'>
                          <li>{t('Header.SignUp')}</li>
                          <Divider className='divider' role='presentation' variant='fullWidth' />
                        </Link>
                      </>
                    )
              }
            </ul>
          </nav>
        </div>

      {auth.status === 'authenticated'
        ? (
        <nav className='mobile-nav'>
          <ul className='mobile-nav-ul'>
            <li className='active-bg'>
              <Link to='/' onClick={(e) => selectedItem(e)}>
                <img alt='Home' src={home} className='icon-mobile active-item' />
              </Link>
            </li>
            <li>
            <Link to={`/client/dashboard/profile/${auth?.user.uid}`} onClick={(e) => selectedItem(e)}>
              <img alt='Profile' src={profileMobile} className='icon-mobile' />
            </Link>
            </li>
            <li>
            <Link to='saved' onClick={(e) => selectedItem(e)}>
              <img alt='Saved' src={savedMobile} className='icon-mobile' />
            </Link>
            </li>
            <li>
            <Link to='chats'>
              <Badge badgeContent={3} color='success' onClick={(e) => selectedItem(e)}>
                <img alt='Chats' src={chatMobile} className='icon-mobile' />
              </Badge>
            </Link>
            </li>
          </ul>
        </nav>
          )
        : (
            ''
          )}

      <Main>
        <Outlet />
      </Main>
      <ModalLayaout open={modal} setModal={setModal} close={handleCloseModal} setNotification={setNotification} />
    </Layout>
  )
}
