import styled, {css} from 'styled-components'

export type ButtonProps = Partial<{
  $active: boolean
}>

const Button = styled.button<ButtonProps>`
  border: none;
  padding: 0.25em 0.5em;
  ${({ $active }) => $active && css`
    background-color: #3f50b5;
    color: white;
  `}
`

export default Button
