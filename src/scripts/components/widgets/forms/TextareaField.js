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
  readonly: Boolean,
  value: String,
  id: 'String',
  name: 'String',
  type: 'String',
  onChange: (e: Object) => void,
  cols: String,
  rows: String
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

const TextField = styled(Textarea)`
  height: ${props => props.height + 'px'};
  margin-top: 20px;
  padding-bottom: ${props => (props.height > 50 ? '20px' : '0px')};
`

const HelperLabel = styled.span`
  color: ${props => props.theme.colors.TextField.placeholder};
  display: block;
  font-size: 12px;
  padding: 8px 1px 0 0;
  opacity: 0.7;
  white-space: nowrap;
`

class TextareaField extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      filled: false,
      textareaHeight: 44,
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleHeight = this.handleHeight.bind(this)
  }

  handleHeight (target) {
    const value = target.value
    const chars = value.length
    let height = target.scrollHeight

    if (chars < 1) {
      height = 44
    }

    this.setState({
      textareaHeight: height,
      filled: chars > 0
    })
  }

  handleChange (e) {
    this.handleHeight(e.target)
    this.props.onChange(e)
  }

  handleKeyUp (e) {
    this.handleHeight(e.target)
  }

  render () {
    return (
      <LabelField
        className={this.props.className}
        margin={this.props.margin}
        disabled={this.props.disabled}
        type={this.props.type}
      >
        <TextField
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          error={this.props.error}
          type={this.props.type}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          value={this.props.value}
          id={this.props.id}
          name={this.props.name}
          cols={this.props.cols}
          rows={this.props.rows}
          filled={this.state.filled}
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
