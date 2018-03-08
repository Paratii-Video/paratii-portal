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
          top: '86px',
          right: '24px'
        }
      },
      NotificationItem: {
        DefaultStyle: {
          margin: '15px 5px 2px 1px',
          padding: '16px 50px 16px 24px',
          borderRadius: '4px',
          borderTop: 'none',
          backgroundColor: Colors.blackLight,
          color: Colors.white,
          WebkitBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          MozBoxShadow:
            '0 0 1px rgba(' + shadowColor + ',' + shadowOpacity + ')',
          boxShadow:
            '0 3px 10px rgba(' + shadowColor + ',' + shadowOpacity + ')'
        }
      },
      Dismiss: {
        DefaultStyle: {
          fontFamily: 'Roboto',
          fontSize: '24px',
          top: '14px',
          right: '14px',
          fontWeight: 'normal',
          color: Colors.grayLight,
          backgroundColor: 'transparent'
        }
      },
      Title: {
        DefaultStyle: {
          paddingLeft: '25px',
          margin: 0,
          backgroundPosition: 'left center',
          backgroundSize: '15px',
          backgroundRepeat: 'no-repeat',
          color: Colors.white
        },
        success: {
          backgroundImage: 'url("assets/svg/icon-alert-positive.svg")'
        },
        error: {
          backgroundImage: 'url("assets/svg/icon-alert-problem.svg")'
        },
        warning: {
          backgroundImage: 'url("assets/svg/icon-alert-warning.svg")'
        }
      },
      MessageWrapper: {
        DefaultStyle: {
          margin: '10px 0 0 0'
        }
      }
    }

    return <Notifications notifications={notifications} style={style} />
  }
}

export default Notification
