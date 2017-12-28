import React, { Component } from 'react'
import styled from 'styled-components'

import SignupFormContainer from 'containers/SignupFormContainer'

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

class Signup extends Component {
  render () {
    return (
      <Wrapper>
        <Title>Signup</Title>
        <SignupFormContainer />
      </Wrapper>
    )
  }
}

export default Signup
