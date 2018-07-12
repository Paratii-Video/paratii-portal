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
  onClick: (e: Object) => void,
  'data-test-id'?: string
}

const CloseButton = (props: Props) => (
  <Wrapper>
    <IconButton
      data-test-id={props['data-test-id']}
      icon="/assets/img/close-icon.svg"
      onClick={props.onClick}
    />
  </Wrapper>
)

export default CloseButton
