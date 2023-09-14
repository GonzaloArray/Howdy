import { styled } from 'styled-components'
import { Avatar } from '@mui/material'
import { useAppSelector } from '../../../../common/store/config'

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
        cursor: pointer;

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
      </div>
    </UploadPostStyled>
  )
}

export default UploadPost
