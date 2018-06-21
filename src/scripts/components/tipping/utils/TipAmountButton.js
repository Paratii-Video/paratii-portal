/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'

import TipAmount from './TipAmount'

type Props = {
  amount: number,
  disabled?: boolean,
  onClick: (e: Object) => void
}

const WrappedButton = styled.button`
  border: 1px solid ${Colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  height: 60px;
  width: 152px;
  border-radius: 30px;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:hover {
    &:not([disabled]) {
      border-color: Colors.purple;
    }
  }

  &[disabled] {
    background-color: ${Colors.whiteTransparent};
    cursor: not-allowed;
  }
`

class TipButton extends React.Component<Props> {
  render () {
    const { amount, disabled, onClick } = this.props

    return (
      <WrappedButton disabled={disabled} onClick={onClick}>
        <TipAmount amount={amount} disabled={disabled} />
      </WrappedButton>
    )
  }
}

export default TipButton
