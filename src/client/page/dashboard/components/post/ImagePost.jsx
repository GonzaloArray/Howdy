import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`

export const ImagePost = ({ img }) => {
  return (
    <>
      <Image src={img} alt='prueba' />
    </>
  )
}
