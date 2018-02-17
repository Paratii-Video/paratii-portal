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
  border: ${({ theme }) => `1px solid ${theme.colors.popover.border}`};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.popover.background};
  padding: 20px;
`

class Popover extends React.Component<Props, void> {
  render () {
    return (
      <Wrapper onClick={(e: Object) => e.stopPropagation()}>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default Popover
