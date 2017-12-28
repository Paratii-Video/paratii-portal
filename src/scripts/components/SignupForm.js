import React, { Component } from 'react'
import styled from 'styled-components'

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

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {name: '', email: '', password: ''}
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
  }

  handleNameInput (e) {
    this.setState({
      name: e.target.value
    })
  }

  handleEmailInput (e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordInput (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    console.log('should create an account here')
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          type='text'
          onChange={this.handleNameInput}
          placeholder='Name'
          value={this.state.name}
        />
        <Input
          type='text'
          onChange={this.handleEmailInput}
          placeholder='Email'
          value={this.state.email}
        />
        <Input
          type='password'
          onChange={this.handlePasswordInput}
          placeholder='Password'
          value={this.state.password}
        />
        <Button type='submit'>Register</Button>
      </Form>
    )
  }
}

export default SignupForm
