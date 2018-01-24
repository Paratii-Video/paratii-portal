/* @flow */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import UploadContainer from 'containers/UploadContainer'
import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'

import type { RouteMatch } from 'types/ApplicationTypes'
import { setupKeystore } from 'utils/ParatiiLib'

import Sizes from './base/Sizes'
import Themes from './base/Themes'
import Typography from './base/Typography'
import MainTemplate from './templates/MainTemplate'
import MainHeader from './containers/MainHeader'
import Main from './containers/Main'
import MainFooter from './containers/MainFooter'

//

type Props = {
  match: RouteMatch
};

// Paratii Themes

const paratiiTheme = {
  fonts: Typography,
  sizes: Sizes,
  colors: Themes.dark
}

//

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    setupKeystore()
    return (
      <ThemeProvider theme={paratiiTheme}>
        <MainTemplate>
          <MainHeader></MainHeader>
          <Main>
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
          </Main>
          <MainFooter/>
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default App
