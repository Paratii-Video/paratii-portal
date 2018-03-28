import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'

type Props = {
  onSetPin: () => String
}

const NumPadWrapper = styled.div`
  max-width: 260px;
  margin: auto;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const NumberBtn = styled.div`
  padding: 10px;
  border: 1px solid ${Colors.purple};
  color: ${Colors.purple};
  margin: 3px;
  cursor: pointer;
  flex: 1 0 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
  text-align: center;
  border-radius: 2px;
  transition: all 0.3s;

  &:active {
    background-color: ${Colors.purple};
    color: ${Colors.gray};
  }
  &:hover {
    opacity: 0.7;
  }
`

const HashPin = styled.div`
  border-bottom: 1px solid ${Colors.purple};
  color: ${Colors.purple};
  text-align: center;
  padding: 10px;
  margin-top: 15px;
`

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

class NumPad extends Component<Props, Object> {
  handleClick: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      pin: [],
      hidePin: '',
      error: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (number: Number) {
    if (this.state.pin.length < 4) {
      const arrayPin = [...this.state.pin, number]
      const pinString = arrayPin
        .toString()
        .split(',')
        .join('')
      const hidePinString = Array(arrayPin.length + 1).join('#')
      this.props.onSetPin(pinString)
      this.setState({
        pin: arrayPin,
        hidePin: hidePinString
      })
    } else {
      console.log(`you've already insert 4 numbers`)
    }
  }

  render () {
    const numberBtns = numbers.map(number => (
      <NumberBtn
        key={number.toString()}
        value={number}
        onClick={e => this.handleClick(number)}
      >
        {number}
      </NumberBtn>
    ))

    return (
      <NumPadWrapper>
        <ButtonsWrapper>{numberBtns}</ButtonsWrapper>
        <HashPin error={this.state.error.length > 0}>
          {this.state.hidePin}
        </HashPin>
      </NumPadWrapper>
    )
  }
}

export default NumPad
