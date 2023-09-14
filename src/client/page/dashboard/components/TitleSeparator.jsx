import React from 'react'
import { styled } from 'styled-components'

const TitleStyled = styled.div`
  background-color: #A2CD37;
  color: black;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.5rem;

  width: 100%;
`

export const TitleSeparator = ({ children }) => {
  return (
    <TitleStyled>
      {children}
    </TitleStyled>
  )
}
