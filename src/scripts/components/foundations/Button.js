import styled, { css } from 'styled-components'
import {
  BUTTON_HEIGHT,
  BORDER_RADIUS_SMALL,
  BUTTON_PADDING_LEFT
} from 'constants/UIConstants'

export const ButtonStyleText = css`
  ${props => {
    let _size: String

    if (props.anchor) {
      _size = null
    }

    if (props.big) {
      _size = props.theme.fonts.button.big
    } else if (props.small) {
      _size = props.theme.fonts.button.small
    } else {
      _size = props.theme.fonts.button.main
    }

    return css`
      color: ${props => props.theme.colors.button.color};
      font-size: ${_size};
      font-weight: ${props =>
    props.anchor
      ? props.theme.fonts.weight.regular
      : props.theme.fonts.weight.bold};
      text-transform: ${props => (props.anchor ? null : 'uppercase')};
      text-rendering: geometricPrecision;
      user-select: none;
      white-space: nowrap;
    `
  }};
`

export const ButtonStyleDisabled = css`
  opacity: ${props => (props.disabled ? 0.5 : null)};
  pointer-events: ${props => (props.disabled ? 'none' : null)};
`

export const ButtonStyleHover = css`
  backface-visibility: hidden;
  transition: all 0.5s;

  &:focus,
  &:hover {
    filter: brightness(1.3);
  }
`

export const ButtonStyleBackground = css`
  ${props => {
    let _background: String

    if (props.accent) {
      _background =
        'linear-gradient(135deg, ' +
        props.theme.colors.button.accentFrom +
        ' 0%, ' +
        props.theme.colors.button.accentTo +
        ' 100%)'
    } else if (props.highlight) {
      _background =
        'linear-gradient(135deg, ' +
        props.theme.colors.button.highlightFrom +
        ' 0%, ' +
        props.theme.colors.button.highlightTo +
        ' 100%)'
    } else {
      _background =
        'linear-gradient(135deg, ' +
        props.theme.colors.button.primaryFrom +
        ' 0%, ' +
        props.theme.colors.button.primaryTo +
        ' 100%)'
    }

    return css`
      background: ${_background};
      border-radius: ${BORDER_RADIUS_SMALL};
      box-shadow: ${props =>
    props.disableShadow ? null : props.theme.colors.button.shadow};
`
  }};
`

export const IconButtonStyle = css`
  align-items: ${props => (props.iconbutton ? 'center' : null)};
  display: ${props => (props.iconbutton ? 'flex' : null)};
`

export const ButtonStyle = css`
  height: ${BUTTON_HEIGHT};
  padding: 0 ${BUTTON_PADDING_LEFT};
  user-select: none;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
`

export const Button = styled.button.attrs({
  'data-test-id': props => props['data-test-id']
})`
  ${ButtonStyleText} ${ButtonStyleDisabled} ${ButtonStyleHover} ${ButtonStyleBackground} ${ButtonStyle} ${IconButtonStyle} margin: ${props =>
  props.margin};
`

export default Button
