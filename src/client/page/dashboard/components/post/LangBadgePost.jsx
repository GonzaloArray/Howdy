import React from 'react'

import { styled } from 'styled-components'

const Badge = styled.div`

    display: flex ;
    width: 1.2rem;
    padding: 0.15575rem 0rem;
    justify-content: center;
    align-items: center;

    background-color: #F5F8EC;

    padding: 0.2rem;
    border-radius: 0.34031rem;
    border: 1px solid #A2CD37;

    img{
        border-radius: 100%;
        width: 100%;
        aspect-ratio: 1/1;
    }
`

export const LangBadgePost = ({ variant, img }) => {
  return (
    <Badge className={variant}>
      <img src={img} />
    </Badge>
  )
}
