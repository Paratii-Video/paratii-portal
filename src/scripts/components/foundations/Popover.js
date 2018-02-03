/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  children: any,
  style?: Object
}

const Wrapper = styled.div``

class Popover extends React.Component<Props, void> {
  render () {
    return <Wrapper>{this.props.children}</Wrapper>
  }
}

export default Popover
