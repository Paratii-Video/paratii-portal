import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'

import LoginFormContainer from 'containers/LoginFormContainer'

const SignupLink = styled(Link)`
  float: left;
`

class Login extends Component {
  render () {
    return (
      <Wrapper>
        <Title>Login</Title>
        <LoginFormContainer />
        <SignupLink to='/signup'>Signup</SignupLink>
      </Wrapper>
    )
  }
}

export default Login
