import styled, { css } from 'styled-components'
import {
  ButtonStyleText,
  ButtonStyleDisabled,
  ButtonStyleHover,
  IconButtonStyle
} from './Button'

export const ButtonStyleColor = css`
  ${props => {
    let _color: String

    if (props.accent) {
      _color = props.theme.colors.button.accent
    } else if (props.highlight) {
      _color = props.theme.colors.button.highlight
    } else {
      _color = props.theme.colors.button.primary
    }

    return css`
      color: ${_color};
`
  }};
`

const TextButton = styled.button.attrs({
  'data-test-id': props => props['data-test-id']
})`
  ${ButtonStyleText} ${ButtonStyleDisabled} ${ButtonStyleHover} ${ButtonStyleColor} ${IconButtonStyle} margin: ${props =>
  props.margin};
`

export default TextButton
