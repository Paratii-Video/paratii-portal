import { css } from 'styled-components'
import TheButton from './TheButton'

//

const StyleButton = css`
  font-weight: ${props => props.theme.fonts.weight.bold};
  text-transform: uppercase;
`

const ButtonStyle = TheButton.extend`
  ${StyleButton}
`

const Button = ButtonStyle.withComponent('button')

export default Button
