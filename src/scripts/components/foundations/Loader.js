/* @flow */

import React from 'react'
import styled from 'styled-components'

import { BASE_LOADER_DIMENSION } from 'constants/UIConstants'

type Props = {
  height?: string,
  width?: string
}

const Wrapper = styled.div`
  margin: auto;
  height: ${({ height }) => height || BASE_LOADER_DIMENSION};
  width: ${({ width }) => width || BASE_LOADER_DIMENSION};
  transform: translateY(15%);
`

const Loader = ({ height, width }: Props) => (
  <Wrapper height={height} width={width}>
    <div className="paratii-loader" />
  </Wrapper>
)

export default Loader
