import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import Notifications from 'react-notification-system-redux'
import Colors from 'components/foundations/base/Colors'

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

    // here the reference for Style the component
    // https://github.com/igorprado/react-notification-system/blob/master/src/styles.js
    const shadowOpacity = '0.8'
    const style = {
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },

        success: {
          // Applied only to the success notification item
          backgroundColor: Colors.grayDark,
          color: Colors.white,
          borderTopColor: Colors.purple,
          WebkitBoxShadow:
            '0 0 1px rgba(' + Colors.purple + ',' + shadowOpacity + ')',
          MozBoxShadow:
            '0 0 1px rgba(' + Colors.purple + ',' + shadowOpacity + ')',
          boxShadow: '0 0 1px rgba(' + Colors.purple + ',' + shadowOpacity + ')'
        },
        error: {
          backgroundColor: Colors.grayDark,
          color: Colors.white,
          borderTopColor: Colors.pink,
          WebkitBoxShadow:
            '0 0 1px rgba(' + Colors.pink + ',' + shadowOpacity + ')',
          MozBoxShadow:
            '0 0 1px rgba(' + Colors.pink + ',' + shadowOpacity + ')',
          boxShadow: '0 0 1px rgba(' + Colors.pink + ',' + shadowOpacity + ')'
        }
      },
      Dismiss: {
        success: {
          color: Colors.white,
          backgroundColor: Colors.purple
        },
        error: {
          color: Colors.white,
          backgroundColor: Colors.pink
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
