/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'

const DIMENSION_PX = 17

const WrapperSvg = styled.svg`
  background-color: ${Colors.purple};
  border-radius: 50%;
  height: ${DIMENSION_PX}px;
  width: ${DIMENSION_PX}px;
  padding: px;
`

const CheckIcon = () => (
  <WrapperSvg>
    <use xlinkHref="#icon-check" />
  </WrapperSvg>
)

export default CheckIcon
