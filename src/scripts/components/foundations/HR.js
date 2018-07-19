import styled from 'styled-components'
import { HR_HEIGHT, HR_MARGIN_TOP } from 'constants/UIConstants'

export default styled.hr`
  background-color: ${props => props.theme.colors.background.body};
  display: block;
  margin: ${HR_MARGIN_TOP} 0;
  height: ${HR_HEIGHT};
  width: 100%;
`
