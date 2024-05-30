import styled, {css, keyframes} from 'styled-components'

export type ButtonProps = Partial<{
  $active: boolean
  $loading: boolean
}>

const loadingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  padding: 0.25em 0.5em;
  ${({ $loading }) => $loading && css`
    animation: ${loadingAnimation} 1s infinite;
  `}
  ${({ $active }) => $active && css`
    background-color: #3f50b5;
    color: white;
  `}
`

export default Button
