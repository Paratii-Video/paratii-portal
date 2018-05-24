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
  constructor (props: Props) {
    super(props)
    this.state = {
      message: '',
      error: ''
    }
  }

  componentDidMount () {
    const query = window.location.search.substring(1)
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = (event: Object) => {
      if (
        event.currentTarget.readyState === 4 &&
        event.currentTarget.status === 200
      ) {
        // Notification mail sent!
        const response = JSON.parse(xhttp.responseText)
        console.log(response)
        if (response.events && response.events.LogDistribute) {
          console.log('good')
          const redeemPTI = response.events.LogDistribute.returnValues._amount
          this.setState({
            message: `You have earned ${redeemPTI} PTI`
          })
        } else {
          this.setState({
            message: 'Transaction already done',
            error: response.error
          })
        }
      }
    }
    xhttp.open('GET', `/mail/verify/?${query}`, true)
    xhttp.send()
  }

  render () {
    console.log(this.state.message)
    return (
      <Wrapper>
        <Title purple>Mail verification</Title>
        <Text gray>{this.state.message}</Text>
        {!this.state.error && (
          <Text gray>
            Please <a href="/profile">log in</a> to check your balance
          </Text>
        )}
      </Wrapper>
    )
  }
}

export default MailVerify
