import React from 'react'
import { styled } from 'styled-components'

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`

export const ContainerFlexCenter = ({ children }) => {
  return (
    <FlexCenter>
      {children}
    </FlexCenter>
  )
}
