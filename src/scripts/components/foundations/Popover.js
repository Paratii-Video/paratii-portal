/* @flow */

import React from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

type Props = {
  top: number | string,
  left: number | string,
  bottom: number | string,
  right: number | string,
  children: any,
  open: boolean,
  style?: Object
}

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: absolute;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.Popover.background};
  color: ${({ theme }) => theme.colors.Popover.color};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  margin: 20px;
`

class Popover extends React.Component<Props, void> {
  static defaultProps = {
    top: '',
    bottom: '',
    left: '',
    right: ''
  }

  render () {
    const { open, top, left, bottom, right } = this.props
    return (
      <Transition in={open} timeout={0}>
        <Wrapper
          onClick={(e: Object) => e.stopPropagation()}
          top={top}
          left={left}
          bottom={bottom}
          right={right}
        >
          {this.props.children}
        </Wrapper>
      </Transition>
    )
  }
}

export default Popover
