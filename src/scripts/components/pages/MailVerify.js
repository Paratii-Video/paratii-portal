import React, { Component } from 'react'
// import Button from '../foundations/Button'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 710px;
  width: 100%;
`
type Props = {}

// const NavLink = Button.withComponent('a')

class MailVerify extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Title purple>Your Mail is verified</Title>
        <Text gray>You have earned 20 PTI</Text>
      </Wrapper>
    )
  }
}

export default MailVerify
