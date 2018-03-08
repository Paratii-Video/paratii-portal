/* @flow */

import React, { Component } from 'react'
import Notifications from 'react-notification-system-redux'
import Colors from 'components/foundations/base/Colors'

type Props = {
  notifications: Array<Object>
}

class Notification extends Component<Props, Array<Object>> {
  render () {
    const { notifications } = this.props

    // here the reference for Style the component
    // https://github.com/igorprado/react-notification-system/blob/master/src/styles.js
    const shadowOpacity = '0.16'
    const shadowColor = '0, 0, 0'
    const style = {
      Containers: {
        // Top right notification
        tr: {
          top: '96px',
          left: '24px'
        }
      },
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px',
          padding: '16px 50px 16px 24px',
          borderRadius: '4px'
        },
        success: {
          // Applied only to the success notification item
          backgroundColor: Colors.blackLight,
          color: Colors.white,
          borderTopColor: Colors.white,
          WebkitBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          MozBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          boxShadow:
            '0 3px 10px rgba(' + shadowColor + ',' + shadowOpacity + ')'
        },
        error: {
          backgroundColor: Colors.blackLight,
          color: Colors.white,
          borderTopColor: Colors.white,
          WebkitBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          MozBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          boxShadow: '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')'
        }
      },
      Dismiss: {
        DefaultStyle: {
          fontFamily: 'Roboto',
          fontSize: '24px'
        },
        success: {
          color: Colors.grayLight,
          backgroundColor: 'transparent'
        },
        error: {
          color: Colors.grayLight,
          backgroundColor: 'transparent'
        }
      },
      Title: {
        success: {
          color: Colors.purple
        },
        error: {
          color: Colors.pink
        }
      }
    }

    return <Notifications notifications={notifications} style={style} />
  }
}

export default Notification
