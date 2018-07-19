import styled from 'styled-components'
import { INPUT_HEIGHT } from 'constants/UIConstants'
import {
  StyleFieldText,
  StyleFieldTextStates
} from 'components/foundations/forms/Input'

const Textarea = styled.textarea`
  ${StyleFieldText} ${StyleFieldTextStates} line-height: 24px;
  min-height: ${props => INPUT_HEIGHT || ''};
  padding: 12px 0 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
`

export default Textarea
