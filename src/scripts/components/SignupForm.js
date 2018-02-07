/* @flow */

import React, { Component } from 'react'
import SignForm from 'components/foundations/forms/SignForm'
import Button from 'components/foundations/buttons/Button'
import TextField from 'components/widgets/forms/TextField'

type Props = {
  onSubmit: () => void,
  onInputChange: (name: string, e: Object) => void
}
class SignupForm extends Component<Props, void> {
  render () {
    const { onSubmit, onInputChange } = this.props
    return (
      <SignForm onSubmit={onSubmit}>
        <TextField
          id="signup-name"
          type="text"
          onChange={e => onInputChange('name', e)}
          label="Name"
          margin="0 0 30px"
        />
        <TextField
          id="signup-email"
          type="text"
          onChange={e => onInputChange('email', e)}
          label="Email"
          margin="0 0 30px"
        />
        <TextField
          id="signup-password"
          type="password"
          onChange={e => onInputChange('password', e)}
          label="Password"
          margin="0 0 30px"
        />
        <Button id="signup-submit" type="submit" purple>
          Sign up
        </Button>
      </SignForm>
    )
  }
}

export default SignupForm
