import styled from 'styled-components'

export const BoxCloseTag = styled.div`
  position: relative;
  display: inline-block;

  button{
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #02020240;
    font-size: 3rem;
    color: white;
    transition: .2s linear;
  }
  button:hover{
    opacity: 1;
  }
`
