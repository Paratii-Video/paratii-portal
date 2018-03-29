/* @flow */

import React from 'react'
import styled from 'styled-components'

import IconButton from 'components/foundations/buttons/IconButton'

const Wrapper = styled.div`
  display: flex;
  height: 12px;
  width: 12px;
`

type Props = {
  onClick: () => void
}

const CloseButton = ({ onClick }: Props) => (
  <Wrapper>
    <IconButton icon="/assets/img/close-icon.svg" onClick={onClick} />
  </Wrapper>
)

export default CloseButton
