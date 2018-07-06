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
  id: String,
  name: String,
  type: String,
  cols: String,
  rows: String,
  maxLength: String,
  tabIndex: String,
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

const TextField = styled(Textarea)`
  padding-bottom: 10px;
`

const HelperLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  display: block;
  font-size: 12px;
  padding: 8px 1px 0 0;
  opacity: 0.7;
  white-space: nowrap;
`

class TextareaField extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.state = {
      filled: props.value ? props.value.length > 0 : false,
      value: props.value
    }

    this.handleHeight = this.handleHeight.bind(this)
    this.handleFilled = this.handleFilled.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleHeight () {
    let h = this.textField.scrollHeight
    this.textField.style.height = '44px'
    h = this.textField.scrollHeight
    this.textField.style.height = h + 'px'
  }

  handleFilled (e) {
    this.setState({
      filled: e.target.value.length > 0
    })
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
    this.handleFilled(e)
    this.handleHeight()
    this.props.onChange(e)
  }

  handleKeyUp (e) {
    this.handleFilled(e)
    this.handleHeight()
  }

  handleFocus (e) {
    this.handleFilled(e)
    this.handleHeight()
    if (this.props.readonly) {
      e.target.select()
    }
  }

  componentDidMount (): void {
    this.handleHeight()
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState({
      filled: nextProps.value ? nextProps.value.length > 0 : false,
      value: nextProps.value
    })
  }

  componentDidUpdate (): void {
    this.handleHeight()
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
          onFocus={this.handleFocus}
          cols={this.props.cols}
          rows={this.props.rows}
          error={this.props.error}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          id={this.props.id}
          name={this.props.name}
          value={this.state.value}
          maxLength={this.props.maxLength}
          tabIndex={this.props.tabIndex}
          innerRef={ref => (this.textField = ref)}
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
