import { styled } from 'styled-components'
import React from 'react'

const Divisor = styled.div`
  position: relative;
  text-align: center;
  color: #00000075;
  font-size: .7rem;
  margin-top: 1.5rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1.9px;
    background-color: #00000029;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

export const Separator = () => {
  return <Divisor> O </Divisor>
}
