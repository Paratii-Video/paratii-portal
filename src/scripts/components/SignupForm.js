/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void
};

const Form = styled.form`
  font-size: 20px;
  margin: 10px;
`

const Input = styled.input`
  height: 35px;
  font-size: 14px;
  font-weight: 500;
  display: block;
`

const Button = styled.button`
  display: block;
  height: 35px;
  font-size: 14px;
  font-weight: 500;
`

class SignupForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
      <Form onSubmit={(onSubmit)}>
        <Input
          id='signup-name'
          type='text'
          onChange={(e) => onInputChange('name', e)}
          placeholder='Name'
        />
        <Input
          id='signup-email'
          type='text'
          onChange={(e) => onInputChange('email', e)}
          placeholder='Email'
        />
        <Input
          id='signup-password'
          type='password'
          onChange={(e) => onInputChange('password', e)}
          placeholder='Password'
        />
        <Button id='signup-submit' type='submit'>Register</Button>
      </Form>
    )
  }
}

export default SignupForm
