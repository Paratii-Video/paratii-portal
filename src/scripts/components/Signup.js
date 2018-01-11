import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Title from './foundations/Title'
import Wrapper from './foundations/Wrapper'

import SignupFormContainer from 'containers/SignupFormContainer'

const LoginLink = styled(Link)`
  float: left;
`

class Signup extends Component {
  render () {
    return (
      <Wrapper>
        <Title>Signup</Title>
        <SignupFormContainer />
        <LoginLink to='/login'>Login</LoginLink>
      </Wrapper>
    )
  }
}

export default Signup
