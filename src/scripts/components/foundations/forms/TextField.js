import React, { Component } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  className: String,
  error: Boolean,
  label: String,
  helper: String
}

const LabelField = styled.label`
  display: block;
  position: relative;
  width: 100%;
`
const StyleInput = css`
  background-color: transparent;
  font-size: 14px;
  height: ${props => props.theme.sizes.mainInput.height};
  padding: 0 7px;
  width: 100%;
`

const InputField = styled.input`
  ${StyleInput} border-bottom: 1px solid ${props =>
  props.theme.colors.mainInput.border};
  color: ${props => props.theme.colors.mainInput.color};
  position: relative;
  z-index: 2;

  .error & {
    border-color: ${props => props.theme.colors.mainInput.error};
  }
`

const FakeLabel = styled.span`
  ${StyleInput} color: ${props => props.theme.colors.mainInput.placeholder};
  line-height: ${props => props.theme.sizes.mainInput.height};
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: left;
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth} 0.1s;

  ${InputField}:focus + &,
  .filled & {
      transform: translate3d(0, -22px, 0) scale(0.92);
      transition-duration: 0.4s;
      transition-delay: 0s;
    }
  }
  `

const HelperLabel = styled.span`
  color: ${props => props.theme.colors.mainInput.placeholder};
  display: block;
  font-size: 12px;
  padding: 8px 1px 0 0;
  opacity: 0.7;
  text-align: right;
`

class TextField extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      filled: '',
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleClasses = this.handleClasses.bind(this)
  }

  handleClasses () {
    let klass = this.state.filled ? 'filled ' : ''
    klass += this.props.error ? 'error ' : ''
    klass += this.props.className

    return klass
  }

  handleChange (e) {
    let str = e.target.value

    this.setState({
      value: str
    })
  }

  handleKeyUp (e) {
    let str = this.state.value
    let len = str.length

    this.setState({
      filled: len > 0
    })
  }

  render () {
    return (
      <LabelField className={this.handleClasses()}>
        <InputField
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        {this.props.label && <FakeLabel>{this.props.label}</FakeLabel>}
        {this.props.helper && <HelperLabel>{this.props.helper}</HelperLabel>}
      </LabelField>
    )
  }
}
export default TextField
