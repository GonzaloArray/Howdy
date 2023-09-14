import React from 'react'

import Sidebar from './components/Sidebar'

import { ContainerGeneral } from '../../../common/style/container/ContainerGeneral'
import { Outlet, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { neutral } from '../../../common/variables'
import { NotChatYet } from './components/NotChatYet'

const ChatsContainer = styled.div`
  display: flex;
  background-color: ${neutral};
  border-radius: 8px;
`

export const Page = () => {
  const { chat } = useParams()
  return (
    <ContainerGeneral>
      <ChatsContainer>
        <Sidebar />
        {chat ? <Outlet /> : <NotChatYet />}
      </ChatsContainer>
    </ContainerGeneral>
  )
}
