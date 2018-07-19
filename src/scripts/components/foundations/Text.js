import styled, { css } from 'styled-components'
import { ButtonStyleDisabled } from './Button'
export const TextColor = css`
  ${props => {
    let _color: String

    if (props.primary) {
      _color = props.theme.colors.text.primary
    } else if (props.accent) {
      _color = props.theme.colors.text.accent
    } else if (props.highlight) {
      _color = props.theme.colors.text.highlight
    } else if (props.warn) {
      _color = props.theme.colors.text.warn
    } else {
      _color = props.theme.colors.text.secondary
    }

    return css`
      color: ${_color};
`
  }};
`

export const TextStyle = css`
  ${props => {
    return css`
      ${ButtonStyleDisabled} font-weight: ${props =>
  props.bold
    ? props.theme.fonts.weight.bold
    : props.theme.fonts.weight.regular};
      user-select: ${props => (props.disabled ? 'none' : null)};
      text-transform: ${props => (props.uppercase ? 'uppercase' : null)};
`
  }};
`

export const TextSize = css`
  ${props => {
    let _size: String
    let _line: String

    if (props.big) {
      _size = props.theme.fonts.text.big
      _line = props.theme.fonts.text.bigLineHeight
    } else if (props.small) {
      _size = props.theme.fonts.text.small
      _line = props.theme.fonts.text.smallLineHeight
    } else if (props.tiny) {
      _size = props.theme.fonts.text.tiny
      _line = props.theme.fonts.text.tinyLineHeight
    } else {
      _size = props.theme.fonts.text.main
      _line = props.theme.fonts.text.mainLineHeight
    }

    return css`
      font-size: ${_size};
      line-height: ${_line};
`
  }};
`

const Text = styled.p`
  ${TextColor} ${TextSize} ${TextStyle} margin: ${({ margin }) => margin};
`

export const Strong = styled.strong`
  ${TextColor} ${TextSize} ${TextStyle} font-weight: ${props =>
  props.theme.fonts.weight.bold};
`

export const Span = styled.span`
  ${TextColor} ${TextSize} ${TextStyle};
`

export default Text
