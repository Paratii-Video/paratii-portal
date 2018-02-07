import styled, { css, keyframes } from 'styled-components'

const StyleInput = css`
  background-color: transparent;
  font-size: 14px;
  height: ${props => props.theme.sizes.mainInput.height};
  width: 100%;
`
const AutofillFix = props => keyframes` // fix chrome yellow background
  to {
    color: ${props.theme.colors.mainInput.color};
    background: transparent;
  }
`

const Input = styled.input`
  ${StyleInput} border-bottom: 1px solid ${props =>
  props.error
    ? props.theme.colors.mainInput.error
    : props.theme.colors.mainInput.border};
  color: ${props => props.theme.colors.mainInput.color};
  position: relative;
  z-index: 2;

  &:-webkit-autofill {
    animation-name: ${AutofillFix};
    animation-fill-mode: both;
  }
`

export default Input
