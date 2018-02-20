/* stylelint-disable */
// Stylint issue will be fixed in future:
// https://github.com/styled-components/stylelint-processor-styled-components/issues/34
import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  name: String,
  value: String,
  children: Object,
  disabled: Boolean,
  checked: Boolean,
  checkbox: Boolean,
  nomargin: Boolean,
  onChange: (e: Object) => void
}

export const RadioWrapper = styled.div`
  width: 100%;
`

export const RadioTitle = styled.p`
  font-size: ${props => props.theme.fonts.radio.title};
  color: ${props => props.theme.colors.Radio.title};
  margin-bottom: 15px;
`

const RadioInput = styled.label`
  align-items: center;
  cursor: ${props => (props.disabled ? 'initial' : 'pointer')};
  display: inline-flex;
  font-size: ${props => props.theme.fonts.form.input};
  margin: 0 ${props => (props.nomargin ? '0' : '20px')} 20px 0;
  opacity: ${props => (props.disabled ? '0.2' : '')};
  pointer-events: ${props => (props.disabled ? 'none' : '')};
  position: relative;

  input {
    opacity: 0;
    position: absolute;
  }
`

const RadioInputBox = styled.span`
  background-color: transparent;
  border: 2px solid ${props => props.theme.colors.Radio.border};
  border-radius: 2px;
  height: ${props => props.theme.sizes.radio};
  margin-right: 15px;
  transition: all ${props => props.theme.animation.time.repaint};
  width: ${props => props.theme.sizes.radio};

  input:checked + & {
    background-color: ${props => props.theme.colors.Radio.active};
    border-color: ${props => props.theme.colors.Radio.active};

    svg {
      transform: scale(1);
      transition: transform 0.5s ${props => props.theme.animation.ease.smooth}
        0.15s;
    }
  }
`
const RadioInputIcon = styled.svg`
  display: block;
  height: 100%;
  transform: scale(0);
  transition: transform 0.5s ${props => props.theme.animation.ease.smooth};
  width: 100%;
`

const RadioInputLabel = styled.span`
  color: ${props => props.theme.colors.Radio.label};
  font-size: ${props => props.theme.fonts.radio.label};
  user-select: none;
  white-space: nowrap;
`

class RadioCheck extends Component<Props, void> {
  render () {
    return (
      <RadioInput disabled={this.props.disabled} nomargin={this.props.nomargin}>
        <input
          type={this.props.checkbox ? 'checkbox' : 'radio'}
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          disabled={this.props.disabled}
        />
        <RadioInputBox>
          <RadioInputIcon>
            <use xlinkHref="#icon-check" />
          </RadioInputIcon>
        </RadioInputBox>
        <RadioInputLabel>{this.props.children}</RadioInputLabel>
      </RadioInput>
    )
  }
}
export default RadioCheck
