import React, { Component } from 'react'
import styled from 'styled-components'
import Colors from 'components/foundations/base/Colors'

type Props = {
  onSetPin: () => String,
  reset: Boolean,
  error: String
}

const NumPadWrapper = styled.div`
  max-width: 270px;
  margin: auto;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const NumberBtn = styled.div`
  user-select: none;
  border: 2px solid ${Colors.purple};
  color: ${Colors.purple};
  margin: 0 6px 12px;
  cursor: pointer;
  flex: 1 0 68px;
  max-width: 68px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 2px;
  transition: all ${props => props.theme.animation.time.repaint};

  &:active {
    background-color: ${Colors.purple};
    color: ${Colors.white};
  }
  &:hover {
    background-color: ${Colors.purple};
    color: ${Colors.white};
  }
`

const HashPin = styled.div`
  border-bottom: 1px solid
    ${props =>
    props.error
      ? props.theme.colors.TextField.error
      : props.theme.colors.body.primary};
  color: ${props =>
    props.error
      ? props.theme.colors.TextField.error
      : props.theme.colors.body.primary};
  text-align: center;
  padding: 10px;
  height: 40px;
  margin-top: 15px;
`

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

class NumPad extends Component<Props, Object> {
  handleClick: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      pin: [],
      hidePin: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.reset) {
      this.setState({
        pin: [],
        hidePin: ''
      })
    }
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
        data-test-id={'button-' + number}
        onClick={e => this.handleClick(number)}
      >
        {number}
      </NumberBtn>
    ))
    return (
      <NumPadWrapper>
        <ButtonsWrapper>{numberBtns}</ButtonsWrapper>
        <HashPin error={this.props.error}>{this.state.hidePin}</HashPin>
      </NumPadWrapper>
    )
  }
}

export default NumPad
