import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import Notifications from 'react-notification-system-redux'

type Props = {
  notifications: Array
}

class Notification extends Component<Props, Array> {
  constructor (props: Props) {
    super(props)
    console.log(this.props)
  }

  componentWillReceiveProps (nextProps: Props): void {
    console.log(nextProps)
  }

  render () {
    const { notifications } = this.props
    console.log('NOTY!')
    console.log(notifications)

    // Optional styling
    const style = {
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },

        success: {
          // Applied only to the success notification item
          // color: 'red'
        }
      }
    }

    return <Notifications notifications={notifications} style={style} />
  }
}

export default Notification
