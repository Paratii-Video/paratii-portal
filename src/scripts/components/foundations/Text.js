import styled from 'styled-components'

export default styled.p`
  font-size: ${props => {
    if (props.big) {
      return props.theme.fonts.text.big
    } else if (props.small) {
      return props.theme.fonts.text.small
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
      return '24px'
    } else if (props.small) {
      return '24px'
    } else {
      return '24px'
    }
  }};
`
