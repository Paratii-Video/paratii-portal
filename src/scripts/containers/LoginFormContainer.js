import React, { Component } from 'react'

import LoginForm from 'components/LoginForm'

class LoginFormContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {email: '', password: ''}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  };

  handleSubmit (e) {
    console.log('user ' + this.state.email + 'has loged in')
  }

  render () {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    )
  }
}

export default LoginFormContainer
