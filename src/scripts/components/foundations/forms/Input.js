import styled, { css, keyframes } from 'styled-components'

const AutofillFix = props => keyframes`
  to {
    color: ${props.theme.colors.TextField.color};
    background: transparent;
  }
`

export const StyleFieldText = css`
  background-color: transparent;
  font-family: ${props => props.theme.fonts.family}, sans-serif;
  font-size: ${props => props.theme.fonts.form.input};
  font-weight: ${props => props.theme.fonts.weight.regular};
  width: 100%;
`

export const StyleFieldTextStates = css`
  border: 0;
  border-bottom: 1px solid
    ${props =>
    props.error
      ? props.theme.colors.TextField.error
      : props.theme.colors.TextField.border};
  color: ${props => props.theme.colors.TextField.color};
  display: block;
  transition: border-color ${props => props.theme.animation.time.repaint};
  width: 100%;

  &:focus {
    border-color: ${props => props.theme.colors.TextField.borderFocus};
  }

  &:-webkit-autofill {
    animation-name: ${AutofillFix};
    animation-fill-mode: both;
  }
`

const Input = styled.input`
  ${StyleFieldText} ${StyleFieldTextStates} height: ${props =>
  props.theme.sizes.mainInput.height};
  position: relative;
  z-index: 2;
`

export default Input
