/* @flow */

import React from 'react'
import styled from 'styled-components'

type Props = {
  height?: string,
  width?: string
}

const Wrapper = styled.div`
  margin: auto;
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
`

const Loader = ({ height, width }: Props) => (
  <Wrapper height={height} width={width}>
    <div className="paratii-loader" />
  </Wrapper>
)

export default Loader
