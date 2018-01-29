import { css } from 'styled-components'
import BaseButton from './BaseButton'

//

const StyleAnchor = css`
  ${props => {
    if (props.underline) {
      let _css = 'padding-bottom: 5px; border-bottom: 1px solid '

      if (props.white) {
        _css = _css + props.theme.colors.button.white
      } else if (props.purple) {
        console.log('props.purple:', props)
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

const AnchorStyle = BaseButton.extend`
  ${StyleAnchor};
  `

const Anchor = AnchorStyle.withComponent('a')

export default Anchor
