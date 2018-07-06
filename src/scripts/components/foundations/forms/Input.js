import styled, { css, keyframes } from 'styled-components'

const AutofillFix = props => keyframes`
  to {
    color: ${props.theme.colors.text.primary};
    background: transparent;
  }
`

export const StyleFieldText = css`
  background-color: transparent;
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.family}, sans-serif;
  font-size: ${props => props.theme.fonts.form.input};
  font-weight: ${props => props.theme.fonts.weight.regular};
  width: 100%;

  &:-webkit-autofill {
    animation-name: ${AutofillFix};
    animation-fill-mode: both;
  }
`

export const StyleFieldTextStates = css`
  border: 0;
  border-bottom: 1px solid
    ${props =>
    props.error
      ? props.theme.colors.text.error
      : props.theme.colors.text.secondary};
  display: block;
  transition: border-color 0.3s;
  width: 100%;

  &:focus {
    border-color: ${props => props.theme.colors.text.warn};
  }
`

const Input = styled.input`
  ${StyleFieldText} ${StyleFieldTextStates} height: ${props =>
  props.theme.sizes.mainInput.height};
  position: relative;
  z-index: 2;
`

export default Input
