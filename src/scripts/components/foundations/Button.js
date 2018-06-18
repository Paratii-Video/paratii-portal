import styled, { css } from 'styled-components'

export const ButtonStyleBackground = css`
  ${props => {
    let _background: String

    if (props.white) {
      _background = props.theme.colors.button.white
    } else if (props.gray) {
      _background = props.theme.colors.button.gray
    } else if (props.pink) {
      _background = props.theme.colors.button.pink
    } else if (props.green) {
      _background = props.theme.colors.button.green
    } else {
      _background =
        'linear-gradient(135deg, ' +
        props.theme.colors.VideoForm.info.progress.barFrom +
        ' 0%, ' +
        props.theme.colors.VideoForm.info.progress.barTo +
        ' 100%)'
    }

    return css`
      background: ${_background};
`
  }};
`

export const ButtonStyleColor = css`
  ${props => {
    let _color: String

    if (props.white) {
      _color = props.theme.colors.button.white
    } else if (props.purple) {
      _color = props.theme.colors.button.purple
    } else if (props.pink) {
      _color = props.theme.colors.button.pink
    } else if (props.green) {
      _color = props.theme.colors.button.green
    } else {
      _color = props.theme.colors.button.gray
    }

    return css`
      color: ${_color};
`
  }};
`

export const StyleAnchor = css`
  ${props => {
    if (props.underline) {
      let _css = 'padding-bottom: 5px; border-bottom: 1px solid '

      if (props.white) {
        _css = _css + props.theme.colors.button.white
      } else if (props.purple) {
        _css = _css + props.theme.colors.button.purple
      } else {
        _css = _css + props.theme.colors.button.gray
      }

      return css`
        ${_css};
`
    }
  }};
`

export const ButtonStyle = css`
  box-shadow: ${props => props.theme.colors.button.shadow};
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  font-size: ${props => (props.anchor ? null : props.theme.fonts.button)};
  font-weight: ${props =>
    props.anchor
      ? props.theme.fonts.weight.regular
      : props.theme.fonts.weight.bold};
  margin: ${props => props.margin};
  opacity: ${props => (props.disabled ? 0.5 : null)};
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  text-transform: ${props => (props.anchor ? null : 'uppercase')};
  user-select: ${props => (props.anchor ? null : 'none')};
  text-rendering: geometricPrecision;
`

export const ButtonStyleHover = css`
  backface-visibility: hidden;
  transition: all 0.5s;

  &:focus,
  &:hover {
    filter: brightness(1.3);
  }
`

export const ButtonColor = styled.button`
  ${ButtonStyle} ${ButtonStyleHover} ${ButtonStyleBackground} border-radius: 2px;
  color: ${props => props.theme.colors.button.white};
  padding: 8px 18px;
`

const Button = styled.button.attrs({
  'data-test-id': props => props['data-test-id']
})`
  ${StyleAnchor} ${ButtonStyleColor} ${ButtonStyleHover} cursor: ${props =>
  props.disabled ? 'initial' : 'pointer'};
  font-size: ${props => (props.anchor ? null : props.theme.fonts.button)};
  font-weight: ${props =>
    props.anchor
      ? props.theme.fonts.weight.regular
      : props.theme.fonts.weight.bold};
  margin: ${props => props.margin};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : null)};
  text-transform: ${props => (props.anchor ? null : 'uppercase')};
  user-select: ${props => (props.anchor ? null : 'none')};
`

export default Button
