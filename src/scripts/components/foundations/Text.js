import styled, { css } from 'styled-components'

export const ColorText = css`
  ${props => {
    let _color: String

    if (props.gray) {
      _color = props.theme.colors.button.gray
    } else if (props.purple) {
      _color = props.theme.colors.button.purple
    } else if (props.pink) {
      _color = props.theme.colors.button.pink
    } else {
      _color = props.theme.colors.button.white
    }

    return css`
      color: ${_color};
    `
  }};
  `

export default styled.p`
  ${ColorText} font-size: ${props => {
  if (props.big) {
    return props.theme.fonts.text.big
  } else if (props.small) {
    return props.theme.fonts.text.small
  } else if (props.tiny) {
    return props.theme.fonts.text.tiny
  } else {
    return props.theme.fonts.text.main
  }
}};
  font-weight: ${props =>
    props.bold
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
  line-height: ${props => {
    if (props.big) {
      return props.theme.fonts.text.bigLineHeight
    } else if (props.small) {
      return props.theme.fonts.text.bigLineHeight
    } else if (props.tiny) {
      return props.theme.fonts.text.tinyLineHeight
    } else {
      return props.theme.fonts.text.mainLineHeight
    }
  }};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`
