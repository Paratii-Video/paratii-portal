/* flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import paratii from 'utils/ParatiiLib'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import Loader from '../foundations/Loader'
import {
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS
} from 'constants/ApplicationConstants'

import type { Notification, NotificationLevel } from 'types/ApplicationTypes'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 710px;
  width: 100%;
`

type Props = {
  showNotification: (Notification, NotificationLevel) => void
}

type State = {
  message: string,
  error: string,
  requestInitiated: boolean
}

// const NavLink = Button.withComponent('a')

class MailVerify extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      message: '',
      error: '',
      requestInitiated: false
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
        if (response.events && response.events.LogDistribute) {
          const redeemWei = response.events.LogDistribute.returnValues._amount
          const redeemPTI = paratii.eth.web3.utils.fromWei(String(redeemWei))
          this.setState({
            message: `You have earned ${redeemPTI} PTI`,
            error: ''
          })

          this.props.showNotification(
            {
              title: 'Email Confirmed!',
              message: `Your email has been confirmed. You have earned ${redeemPTI}, use it wisely.`,
              position: NOTIFICATION_POSITIONS.TOP_RIGHT
            },
            NOTIFICATION_LEVELS.SUCCESS
          )
        } else {
          this.setState({
            message: 'An error occured',
            error: 'An error occured'
          })

          this.props.showNotification(
            {
              title: 'Error confirming email',
              message: 'We have encountered an unexpected error.',
              position: NOTIFICATION_POSITIONS.TOP_RIGHT
            },
            NOTIFICATION_LEVELS.ERROR
          )
        }
      }
    }
    xhttp.open('GET', `/mail/verify/?${query}`, true)
    this.setState({ requestInitiated: true })
    xhttp.send()
  }

  renderContents () {
    const { error, requestInitiated } = this.state

    if (!requestInitiated) {
      return <Loader />
    }

    return (
      !error && (
        <Text gray>
          Please <Link to="/profile">log in</Link> to check your balance
        </Text>
      )
    )
  }

  render () {
    return (
      <Wrapper>
        <Title purple>Mail verification</Title>
        <Text gray>{this.state.message}</Text>
        {this.renderContents()}
      </Wrapper>
    )
  }
}

export default MailVerify
