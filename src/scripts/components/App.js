/* @flow */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

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

type Props = {
  match: RouteMatch,
  setSelectedVideo: (id: string) => void
}

const paratiiTheme = {
  animation: Animation,
  fonts: Typography,
  sizes: Sizes,
  colors: Themes.dark
}

const PortalPlayWrapper = styled.div`
  flex: 0 1 75%;
  width: 75%;
  max-height: 450px;
`

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    setupKeystore()
    return (
      <ThemeProvider theme={paratiiTheme}>
        <MainTemplate>
          <MainHeader />
          <Main>
            <Route path={`${match.url}signup`} component={SignupContainer} />
            <Route path={`${match.url}login`} component={LoginContainer} />
            <Route path={`${match.url}profile`} component={ProfileContainer} />
            <Route
              path={`${match.url}play/:id`}
              component={props => (
                <PortalPlayWrapper>
                  <PlayContainer {...props} />
                </PortalPlayWrapper>
              )}
              onEnter={() => {
                console.log('entering rout')
              }}
            />
            <Route path={`${match.url}upload`} component={VideoManager} />
            <Route path={`${match.url}debug`} component={DebugContainer} />
          </Main>
          <MainFooter />
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default App
