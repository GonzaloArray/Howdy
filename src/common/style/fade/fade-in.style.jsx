import { styled } from 'styled-components'

export const FadeIn = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
