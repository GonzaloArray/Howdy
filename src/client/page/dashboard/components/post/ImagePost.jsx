import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`

export const ImagePost = () => {
  return (
    <>
      <Image src='https://images.unsplash.com/photo-1549388604-817d15aa0110' alt='prueba' />
    </>
  )
}
