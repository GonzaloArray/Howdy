import React from 'react'
import { Chip } from '@mui/material'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'

const InterestsStyled = styled.section`

    background-color: white;

    padding: 1rem 0;
    width: 100%;

    .interest{
        border: 0.25px solid #A2CD37;
        border-radius: 5px;
        padding: 1rem;

        h2{
          font-weight: bold;
        }
      }

      .badges-div{
        display: flex;
        width: 100%;
        overflow: hidden;
        overflow-x: scroll;

        gap: 10px;
        padding: 1rem 0;
      }

      .interest-badge{
        background-color: white;
        border: 1px solid #79747E;
        color: #C32B8F;
      }

      @media screen and (min-width: 768px){
        
        .badges-div{
          overflow: hidden;
          flex-wrap: wrap;
        }
      }
`

export const Page = ({ data }) => {
  const { t } = useTranslation()

  if (data?.selectedInterest.length > 0) {
    return (
      <InterestsStyled>
        <div className='interest'>
          <h2>{t('Profile.Interest')}</h2>
          <div className='badges-div'>
            {
          data?.selectedInterest.map((interest, index) => {
            return <Chip key={index} label={interest.data} className='interest-badge' />
          })
        }
          </div>
        </div>
      </InterestsStyled>
    )
  } else {
    <></>
  }
}
