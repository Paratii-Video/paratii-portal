/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './foundations/buttons/Button'
import Input from './foundations/Input'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void,
  isLoggingIn: boolean
}

const Form = styled.form`
  font-size: 20px;
  margin: 10px;
`

class LoginForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
      <Form onSubmit={onSubmit}>
        <Input
          data-test-id="login-email"
          type="text"
          onChange={e => onInputChange('email', e)}
          placeholder="Email"
        />
        <Input
          data-test-id="login-password"
          type="password"
          onChange={e => onInputChange('password', e)}
          placeholder="Password"
        />
        <Button
          data-test-id="login-submit"
          type="submit"
          disabled={this.props.isLoggingIn}
        >
          Login
        </Button>
      </Form>
    )
  }
}

export default LoginForm
