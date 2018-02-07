/* @flow */

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'
import VideoManager from 'containers/VideoManagerContainer'

import type { RouteMatch } from 'types/ApplicationTypes'

import MainTemplate from './templates/MainTemplate'
import MainHeader from './structures/MainHeader'
import Main from './structures/Main'
import MainFooter from './structures/MainFooter'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import { paratiiTheme } from 'constants/ApplicationConstants'

type Props = {
  initializeApp: () => void,
  match: RouteMatch,
  setSelectedVideo: (id: string) => void
}

const PortalPlayWrapper = styled.div`
  flex: 0 1 75%;
  width: 75%;
  max-height: 450px;
`

class App extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.props.initializeApp()
  }

  render () {
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
              <Route
                path={`${match.url}play/:id`}
                render={props => (
                  <PortalPlayWrapper>
                    <PlayContainer {...props} />
                  </PortalPlayWrapper>
                )}
              />
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
