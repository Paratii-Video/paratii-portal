import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import Notifications from 'react-notification-system-redux'

type Props = {
  store: Object,
  notifications: Array
}

class Notification extends Component<Props, Object> {
  render () {
    const { notifications } = this.props

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
          color: 'red'
        }
      }
    }

    return <Notifications notifications={notifications} style={style} />
  }
}

export default Notification
// DemoComponent.contextTypes = {
//   store: PropTypes.object
// };
//
// DemoComponent.propTypes = {
//   notifications: PropTypes.array
// };
