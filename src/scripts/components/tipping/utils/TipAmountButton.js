/* @flow */

import React from 'react'
import styled from 'styled-components'

import Colors from 'components/foundations/base/Colors'

import TipAmount from './TipAmount'

type Props = {
  amount: number,
  onClick: (e: Object) => void
}

const WrappedButton = styled.button`
  border: 1px solid ${Colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  color: ${Colors.grayLight};
  height: 60px;
  width: 152px;
  border-radius: 30px;
  font-weight: bold;
  text-transform: uppercase;

  &:active,
  &:hover {
    border-color: ${Colors.purple};
    opacity: 1;
  }
`

class TipButton extends React.Component<Props> {
  render () {
    const { amount, onClick } = this.props

    return (
      <WrappedButton onClick={onClick}>
        <TipAmount amount={amount} />
      </WrappedButton>
    )
  }
}

export default TipButton
