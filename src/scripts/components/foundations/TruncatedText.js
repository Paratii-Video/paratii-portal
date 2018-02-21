/* @flow */

import styled from 'styled-components'

export default styled.span`
  display: inline-block;
  width: 100%;
  max-width: ${props => props.maxWidth};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
