import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'

const DesciptionStyled = styled.section`

    background-color: white;

    padding: 1rem 0;

    width: 100%;

    div{
        border: 0.25px solid #A2CD37;
        border-radius: 5px;
        padding: 1rem;

    h2{
        font-weight: bold;
    }
    
    }

`

export const Page = ({ data }) => {
  const { t } = useTranslation()

  return (
    <DesciptionStyled>
      <div>
        <h2>{t('Profile.Desc.Title')}</h2>
        <p>
          {data?.selectedDescription}
        </p>
      </div>
    </DesciptionStyled>
  )
}
