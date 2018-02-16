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

import type { Match } from 'react-router-dom'

import MainTemplate from './templates/MainTemplate'
import Modal from './widgets/modals/Modal'
import MainHeader from './structures/header/MainHeader'
import Main from './structures/Main'
import MainFooter from './structures/footer/MainFooter'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

import { paratiiTheme } from 'constants/ApplicationConstants'

type Props = {
  initializeApp: () => void,
  match: Match,
  setSelectedVideo: (id: string) => void
}

const PortalPlayWrapper = styled.div`
  flex: 1 0 100%;
  display: flex;
  max-height: 500px;
  max-width: 825px;
  width: 100%;
  margin: 0 auto;
`

class App extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.props.initializeApp()

    this.state = {
      modalContent: Object,
      showModal: false
    }

    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  showModal (View) {
    this.setState({
      modalContent: View,
      showModal: true
    })
  }

  closeModal (view) {
    this.setState({
      showModal: false
    })
  }

  render () {
    const { match } = this.props
    return (
      <ThemeProvider theme={paratiiTheme}>
        <MainTemplate>
          <Modal
            show={this.state.showModal}
            closeModal={this.closeModal}
            content={this.state.modalContent}
          />

          <MainHeader />
          <Main>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home showModal={this.showModal} />}
              />
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
          {/* <DebugContainer /> */}
          <MainFooter />
        </MainTemplate>
      </ThemeProvider>
    )
  }
}

export default App
