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

import Animation from './foundations/base/Animation'
import Sizes from './foundations/base/Sizes'
import Themes from './foundations/base/Themes'
import Typography from './foundations/base/Typography'
import MainTemplate from './templates/MainTemplate'
import MainHeader from './structures/MainHeader'
import Main from './structures/Main'
import MainFooter from './structures/MainFooter'

import Home from './pages/Home'

type Props = {
  match: RouteMatch
};

const paratiiTheme = {
  animation: Animation,
  fonts: Typography,
  sizes: Sizes,
  colors: Themes.dark
}

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    setupKeystore()
    return (
      <ThemeProvider theme={paratiiTheme}>
        <MainTemplate>
          <MainHeader/>
          <Main>
            <Route exact path='/' component={Home}/>
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
