/* stylelint-disable */
// Stylint issue will be fixed in future:
// https://github.com/styled-components/stylelint-processor-styled-components/issues/34
import React, { Component } from 'react'
import styled from 'styled-components'
import { StyleFieldText } from 'components/foundations/forms/Input'
import Textarea from 'components/foundations/forms/Textarea'
import {
  StyleInputFilled,
  StylePlaceholder
} from 'components/widgets/forms/TextField'

type Props = {
  className: String,
  error: Boolean,
  label: String,
  helper: String,
  margin: String,
  disabled: Boolean,
  id: 'String',
  type: 'String',
  onChange: (e: Object) => void
}

const LabelField = styled.label`
  margin: ${props => props.margin};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  display: ${props => (props.type === 'hidden' ? 'none' : 'block')};
  position: relative;
  width: 100%;
`

const FakePlaceholder = styled.span`
  ${StyleFieldText} ${StylePlaceholder} .filled &, ${Textarea}:focus + & {
    ${StyleInputFilled};
  }
`

const HelperLabel = styled.span`
  color: ${props => props.theme.colors.TextField.placeholder};
  display: block;
  font-size: 12px;
  padding: 8px 1px 0 0;
  opacity: 0.7;
  text-align: right;
  white-space: nowrap;
`

class TextareaField extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      filled: false,
      textareaHeight: 0,
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleChange (e) {
    const str = e.target.value

    this.setState({
      value: str
    })

    this.props.onChange(e)
  }

  handleKeyUp (e) {
    const str = this.state.value
    const len = str.length

    this.setState({
      textareaHeight: e.target.scrollHeight,
      filled: len > 0
    })
  }

  render () {
    return (
      <LabelField
        className={this.props.className}
        margin={this.props.margin}
        disabled={this.props.disabled}
        type={this.props.type}
      >
        <Textarea
          rows="1"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          error={this.props.error}
          id={this.props.id}
          type={this.props.type}
          disabled={this.props.disabled}
          height={this.state.textareaHeight}
        />
        {this.props.label && (
          <FakePlaceholder filled={this.state.filled}>
            {this.props.label}
          </FakePlaceholder>
        )}
        {this.props.helper && <HelperLabel>{this.props.helper}</HelperLabel>}
      </LabelField>
    )
  }
}
export default TextareaField
