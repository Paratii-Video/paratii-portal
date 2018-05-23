/* @flow */

import React from 'react'
import styled from 'styled-components'
import Blockies from 'react-blockies'

import { add0x } from 'utils/AppUtils'

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.header.color};
  border-radius: 100%;
  height: 100px;
  margin-bottom: 20px;
  overflow: hidden;
  width: 100px;
`

type Props = {
  address: string,
  scale?: number,
  size?: number
}

const UserAvatar = ({ address = '', scale = 10, size = 10 }: Props) => (
  <Wrapper>
    <Blockies seed={add0x(address || '')} size={size} scale={scale} />
  </Wrapper>
)

export default UserAvatar
