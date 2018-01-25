import { css } from 'styled-components'
import TheButton from './TheButton'

//

const StyleAnchor = css`
  ${props => {
    if (props.anchor) {
      if (props.white) {
        return css`
          border-bottom: 1px solid ${props => props.theme.colors.button.white};
          padding-bottom: 5px;
        `
      } else if (props.purple) {
        return css`
          border-bottom: 1px solid ${props => props.theme.colors.button.purple};
          padding-bottom: 5px;
        `
      } else {
        return css`
          border-bottom: 1px solid ${props => props.theme.colors.button.gray};
          padding-bottom: 5px;
        `
      }
    }
  }}
`

const AnchorStyle = TheButton.extend`
  ${StyleAnchor}
`
const Anchor = AnchorStyle.withComponent('a')

export default Anchor