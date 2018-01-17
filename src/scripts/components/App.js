/* @flow */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import logo from 'assets/img/paratii_logo.png'

import UploadContainer from 'containers/UploadContainer'
import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Header = styled.header`
  background-color: #222;
  flex: 0 0 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  height: 80px;
`

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt='logo' />
        </Header>
        <Route
          exact path='/'
          component={DebugContainer}
        />
        <Route
          path={`${match.url}uploader`}
          component={UploadContainer}
        />
        <Route
          path={`${match.url}signup`}
          component={SignupContainer}
        />
        <Route
          path={`${match.url}login`}
          component={LoginContainer}
        />
        <Route
          path={`${match.url}profile`}
          component={ProfileContainer}
        />
        <Route path={`${match.url}play/:id`} component={PlayContainer} />
        <Route
          path={`${match.url}debug`}
          component={DebugContainer}
        />
      </Wrapper>
    )
  }
}

export default App
