/* stylelint-disable */
// Stylint issue will be fixed in future:
// https://github.com/styled-components/stylelint-processor-styled-components/issues/34
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import InputField, { StyleFieldText } from 'components/foundations/forms/Input'

export const StyleInputFilled = css`
  transform: translate3d(0, -22px, 0) scale(0.9);
  transition-duration: 0.4s;
  transition-delay: 0s;
`

export const StylePlaceholder = css`
  color: ${props => props.theme.colors.text.secondary};
  height: ${props => props.theme.sizes.mainInput.height};
  line-height: ${props => props.theme.sizes.mainInput.height};
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: left;
  transform: ${props =>
    props.filled || props.readonly
      ? 'translate3d(0, -22px, 0) scale(0.9)'
      : 'translate3d(0, 0, 0) scale(1)'};
  transition-delay: ${props =>
    props.filled || props.readonly ? '0s' : '0.1s'};
  transition-duration: ${props =>
    props.filled || props.readonly ? '0.4s' : '0.6s'};
  transition-property: 'transform';
  transition-timing-function: ${props => props.theme.animation.ease.smooth};
  white-space: nowrap;
`

const LabelField = styled.label`
  margin: ${props => props.margin};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  display: ${props => (props.type === 'hidden' ? 'none' : 'block')};
  position: relative;
  width: 100%;
`

const Placeholder = styled.span`
  ${StyleFieldText} ${StylePlaceholder} .filled &, ${InputField}:focus + & {
    ${StyleInputFilled};
  }
`

const HelperLabel = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  display: block;
  font-size: ${props => props.theme.fonts.form.helper};
  padding: 8px 1px 0 0;
  opacity: 0.7;
  white-space: nowrap;
`

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
  maxLength: String,
  tabIndex: String,
  onChange: (e: Object) => void,
  onBlur?: (e: Object) => void
}

class TextField extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      filled: this.props.value ? this.props.value.length > 0 : false,
      value: this.props.value
    }

    this.handleFilled = this.handleFilled.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleFilled (e) {
    const isfilled = e.target.value.length > 0

    if (isfilled !== this.state.filled) {
      this.setState({
        filled: isfilled
      })
    }
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
    this.handleFilled(e)
    this.props.onChange(e)
  }

  handleKeyUp (e) {
    this.handleFilled(e)
  }

  handleFocus (e) {
    this.handleFilled(e)
    if (this.props.readonly) {
      e.target.select()
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState({
      filled: nextProps.value ? nextProps.value.length > 0 : false,
      value: nextProps.value
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
        <InputField
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          onFocus={this.handleFocus}
          error={this.props.error}
          type={this.props.type || 'text'}
          disabled={this.props.disabled}
          readonly={this.props.readonly}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          maxLength={this.props.maxLength}
          tabIndex={this.props.tabIndex}
          innerRef={ref => (this.FormField = ref)}
        />
        {this.props.label && (
          <Placeholder
            filled={this.state.filled}
            readonly={this.props.readonly}
          >
            {this.props.label}
          </Placeholder>
        )}
        {this.props.helper && <HelperLabel>{this.props.helper}</HelperLabel>}
      </LabelField>
    )
  }
}
export default TextField
