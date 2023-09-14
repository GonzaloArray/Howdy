import React from 'react'

import { styled } from 'styled-components'

import { Chip, Avatar } from '@mui/material'

const ChipStyled = styled(Chip)`

border-radius: 10px !important;
`

export const LangBadge = ({ label, variante, avatar }) => {
  return (
    <ChipStyled label={label} className={variante} avatar={<Avatar src={avatar} />} />
  )
}
