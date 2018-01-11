/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  isLogged: boolean,
  onClick: () => void
};

const Button = styled.button`
  display: block;
  height: 35px;
  font-size: 14px;
  font-weight: 500;
`

class LogoutButton extends Component<Props, void> {
  render () {
    const {isLogged, onClick} = this.props
    if (isLogged) {
      return <Button onClick={onClick}>Logout</Button>
    } else {
      return (null)
    }
  }
}

export default LogoutButton
