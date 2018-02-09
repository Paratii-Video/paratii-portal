import styled from 'styled-components'
import {
  StyleFieldText,
  StyleFieldTextStates
} from 'components/foundations/forms/Input'

const Textarea = styled.textarea`
  ${StyleFieldText} ${StyleFieldTextStates} line-height: 24px;
  min-height: ${props =>
    props.theme.sizes.mainInput.height
      ? props.theme.sizes.mainInput.height
      : ''};
  padding: 12px 0 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
`

export default Textarea
