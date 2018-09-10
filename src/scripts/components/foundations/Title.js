import styled, { css } from 'styled-components'
import { TextColor, TextStyle } from './Text'

export const TitleSize = css`
  ${props => {
    let _size: String
    let _line: String

    if (props.big) {
      _size = props.theme.fonts.title.big
      _line = props.theme.fonts.title.bigLineHeight
    } else if (props.huge) {
      _size = props.theme.fonts.title.huge
      _line = props.theme.fonts.title.hugeLineHeight
    } else if (props.small) {
      _size = props.theme.fonts.title.small
      _line = props.theme.fonts.title.smallLineHeight
    } else {
      _size = props.theme.fonts.title.main
      _line = props.theme.fonts.title.mainLineHeight
    }

    return css`
      font-size: ${_size};
      line-height: ${_line};
    `
  }};
`

export default styled.h1`
  ${TextColor} ${TextStyle} ${TitleSize} margin: ${({ margin }) => margin};
`
