import { styled } from 'styled-components'
import { Avatar, Divider } from '@mui/material'
import { PostButton } from '../../../../common/components/PostButton'
import { useAppSelector } from '../../../../common/store/config'

import foto from './img/foto.svg'
import video from './img/video.svg'
import audio from './img/audio.svg'
import add from './img/add.svg'
import { useTranslation } from 'react-i18next'

const UploadPostStyled = styled.section`

  padding: 1rem 0;
  width: 100%;

  .container{
      padding: 1.5rem;
      border: 1px solid #A2CD37;
      border-radius: 5px;
    }

    .input-div{
      display: flex;
      align-items: center;
      justify-content: flex-start;

      gap: 1rem;

      button{
        display: flex;
        padding: 0.25rem 0.25rem 0.25rem 1rem;
        align-items: center;
        gap: 0.25rem;
        flex: 1 0 0;
        align-self: stretch;

        color: #49454F;
        border-radius: 28px;

        background: url(${add}) rgba(206, 85, 166, 0.1) no-repeat;
        background-position: calc(98%);
      }
    }

    .divider-post{
      margin: 1rem 0;
    }

    .btn-div{
      display: flex;
      align-items: center;
      justify-content: flex-start;

      gap: 2rem;
    }
    
    @media screen and (min-width: 768px){
      padding: 1rem 0;
    }

`

const data = [
  {
    label: 'Pic',
    onClick: '',
    icon: foto
  },
  {
    label: 'Vid',
    onClick: '',
    icon: video
  },
  {
    label: 'Aud',
    onClick: '',
    icon: audio
  }
]

const UploadPost = ({ click }) => {
  const { t } = useTranslation()

  const auth = useAppSelector((state) => state.auth.user)
  return (
    <UploadPostStyled>
      <div className='container'>
        <div className='input-div'>
          <Avatar src={auth.user.photo ? auth.user.photo : ''} />
          <button onClick={click}>{t('HomeLog.Upload.Post')}</button>
        </div>
        <Divider className='divider-post' />
        <div className='btn-div'>
          {
            data.map((btn, i) => {
              return <PostButton key={i} click={btn?.onClick} icon={btn?.icon} label={t(`HomeLog.Upload.${btn?.label}`)} />
            })
          }
        </div>
      </div>
    </UploadPostStyled>
  )
}

export default UploadPost
