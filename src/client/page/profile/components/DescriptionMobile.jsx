import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'

const DesciptionStyled = styled.section`

  background-color: white;

  padding: 1rem 0;

  width: 100%;

  div{
    border: 0.25px solid #A2CD37;
    border-radius: 5px;
    padding: 0.5rem;

    h2{
      font-weight: bold;
    }
    
  }

  .btn{
    color: #C32B8F;
    text-decoration: underline;
    cursor: pointer;

    display: inline;
  }

`

export const Page = ({ data }) => {
  const { t } = useTranslation()

  const [showMore, setShowMore] = useState(false)

  return (
    <DesciptionStyled>
      <div>
        <h2>{t('Profile.Desc.Title')}</h2>
        <p>
          {data?.selectedDescription.length < 110 ? data?.selectedDescription : showMore ? data?.selectedDescription + ' ' : `${data?.selectedDescription.substring(0, 110)}... `}
          <span className='btn' onClick={() => setShowMore(!showMore)}>{data?.selectedDescription.length < 110 ? '' : showMore ? t('Profile.Desc.ShowLess') : t('Profile.Desc.ShowMore')}</span>
        </p>
      </div>
    </DesciptionStyled>
  )
}
