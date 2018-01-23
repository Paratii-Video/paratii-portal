/* @flow */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import MainHeader from 'components/MainHeader'

import UploadContainer from 'containers/UploadContainer'
import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'

import type { RouteMatch } from 'types/ApplicationTypes'

import { setupKeystore } from 'utils/ParatiiLib'

type Props = {
  match: RouteMatch
};

const Wrapper = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    setupKeystore()
    return (
      <Wrapper>
        <MainHeader/>
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
        <Route
          component={DebugContainer}
        />
      </Wrapper>
    )
  }
}

export default App
