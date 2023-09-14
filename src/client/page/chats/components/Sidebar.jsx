import { styled } from 'styled-components'

import Navbar from './Navbar'
import Search from './Search'
import ChatBar from './ChatBar'

const SidebarContainer = styled.div`
  width: 380px;
  padding: 1rem;
  border-right: 1px solid #0000003e;
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Navbar />
      <Search />
      <ChatBar />
    </SidebarContainer>
  )
}

export default Sidebar
