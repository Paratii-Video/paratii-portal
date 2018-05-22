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
  componentDidMount () {
    const query = window.location.search.substring(1)
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Notification mail sent!
        const response = JSON.parse(xhttp.responseText)
        console.log(response)
        if (response.events.LogDistribute) {
          console.log('good')
          console.log(response)
        } else {
          console.log('transaction already done')
        }
      }
    }
    xhttp.open('GET', `/mail/verify/?${query}`, true)
    xhttp.send()
  }
  render () {
    return (
      <Wrapper>
        <Title purple>Mail verification</Title>
        <Text gray>You have earned 20 PTI</Text>
      </Wrapper>
    )
  }
}

export default MailVerify
