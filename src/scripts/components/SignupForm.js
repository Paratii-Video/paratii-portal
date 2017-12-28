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
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (input, e) {
    this.setState({
      [input]: e.target.value
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
          onChange={(e) => this.handleInput('name', e)}
          placeholder='Name'
          value={this.state.name}
        />
        <Input
          type='text'
          onChange={(e) => this.handleInput('email', e)}
          placeholder='Email'
          value={this.state.email}
        />
        <Input
          type='password'
          onChange={(e) => this.handleInput('password', e)}
          placeholder='Password'
          value={this.state.password}
        />
        <Button type='submit'>Register</Button>
      </Form>
    )
  }
}

export default SignupForm
