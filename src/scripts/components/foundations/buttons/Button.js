import { css } from 'styled-components'
import BaseButton from './BaseButton'

//

const StyleButton = css`
  font-weight: ${props => props.theme.fonts.weight.bold};
  text-transform: uppercase;
`

const ButtonStyle = BaseButton.extend`
  ${StyleButton}
`

const Button = ButtonStyle.withComponent('button')

export default Button
