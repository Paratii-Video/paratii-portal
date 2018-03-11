/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: any,
  open: boolean,
  style?: Object
}

const Wrapper = styled.div`
  width: 100%;
  height: ${({ open }) => (open ? '100%' : '0px')};
  border: ${({ theme }) => `1px solid ${theme.colors.popover.border}`};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.popover.background};
  padding: 20px;
  opacity: ${({ open }) => (open ? 1.0 : 0)};
  transition: all 250ms ${({ theme }) => theme.animation.ease.smooth};
`

class Popover extends React.Component<Props, void> {
  render () {
    const { open } = this.props
    return (
      <Wrapper onClick={(e: Object) => e.stopPropagation()} open={open}>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default Popover
