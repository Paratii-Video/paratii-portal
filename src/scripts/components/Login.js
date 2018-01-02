import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import LoginFormContainer from 'containers/LoginFormContainer'

const Wrapper = styled.div`
  font-size: 20px;
`

const Title = styled.header`
  background-color: #fff;
  height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: #95989a;
  font-weight: 500;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`

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
