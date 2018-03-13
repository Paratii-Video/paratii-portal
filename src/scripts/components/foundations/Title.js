import styled from 'styled-components'
import { ColorText } from './Text'

export default styled.h1`
  ${ColorText} font-size: ${props => {
  if (props.big) {
    return props.theme.fonts.title.big
  } else if (props.small) {
    return props.theme.fonts.title.small
  } else {
    return props.theme.fonts.title.main
  }
}};
  font-weight: ${props =>
    props.bold
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
  line-height: ${props => {
    if (props.big) {
      return props.theme.fonts.title.bigLineHeight
    } else if (props.small) {
      return props.theme.fonts.title.smallLineHeight
    } else {
      return props.theme.fonts.title.mainLineHeight
    }
  }};
`
