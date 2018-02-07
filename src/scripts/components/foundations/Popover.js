/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: any,
  style?: Object
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => `3px solid ${theme.colors.popover.border}`};
  border-radius: 4px;
`

class Popover extends React.Component<Props, void> {
  render () {
    return <Wrapper>{this.props.children}</Wrapper>
  }
}

export default Popover
