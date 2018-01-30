/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './foundations/buttons/Button'
import Input from './foundations/Input'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void
}

const Form = styled.form`
  font-size: 20px;
  margin: 10px;
`

class SignupForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
      <Form onSubmit={onSubmit}>
        <Input
          id="signup-name"
          type="text"
          onChange={e => onInputChange('name', e)}
          placeholder="Name"
        />
        <Input
          id="signup-email"
          type="text"
          onChange={e => onInputChange('email', e)}
          placeholder="Email"
        />
        <Input
          id="signup-password"
          type="password"
          onChange={e => onInputChange('password', e)}
          placeholder="Password"
        />
        <Button id="signup-submit" type="submit">
          Register
        </Button>
      </Form>
    )
  }
}

export default SignupForm
