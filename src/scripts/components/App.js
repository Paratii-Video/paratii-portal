/* @flow */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'
import VideoManager from 'containers/VideoManagerContainer'

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
import NotFound from './pages/NotFound'

type Props = {
  match: RouteMatch
}

const paratiiTheme = {
  animation: Animation,
  fonts: Typography,
  sizes: Sizes,
  colors: Themes.dark
}

class App extends Component<Props, void> {
  render () {
    setupKeystore()
    const { match } = this.props
    return (
      <ThemeProvider theme={paratiiTheme}>
        <MainTemplate>
          <MainHeader />
          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={`${match.url}signup`} component={SignupContainer} />
              <Route path={`${match.url}login`} component={LoginContainer} />
              <Route
                path={`${match.url}profile`}
                component={ProfileContainer}
              />
              <Route path={`${match.url}upload`} component={VideoManager} />
              <Route path={`${match.url}debug`} component={DebugContainer} />
              <Route path={`${match.url}play/:id`} component={PlayContainer} />
              <Route component={NotFound} />
            </Switch>
          </Main>
          <MainFooter />
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default App
