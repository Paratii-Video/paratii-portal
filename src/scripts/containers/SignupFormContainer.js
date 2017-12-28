import React, { Component } from 'react'

import SignupForm from 'components/SignupForm'

class SignupFormContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {name: '', email: '', password: ''}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  };

  handleSubmit (e) {
    console.log('should create an account here')
  }

  render () {
    return (
      <SignupForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
      />
    )
  }
}

export default SignupFormContainer
