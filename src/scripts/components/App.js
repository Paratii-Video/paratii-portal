/* @flow */

import React, { Component } from 'react'
import { Route, Switch, Redirect, History } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { ThemeProvider } from 'styled-components'

import ProfileContainer from 'containers/ProfileContainer'

import ProfileEditContainer from 'containers/ProfileEditContainer'
import ProfileMyVideosContainer from 'containers/ProfileMyVideosContainer'

import PlayContainer from 'containers/PlayContainer'
import VideoManager from 'containers/VideoManagerContainer'
import EditVideo from 'containers/EditVideoContainer'
import DebugContainer from 'containers/DebugContainer'
import WalletContainer from 'containers/WalletContainer'
import SearchResultsContainer from 'containers/pages/SearchResultsContainer'
import MainHeader from 'containers/MainHeaderContainer'
import UserNav from 'containers/UserNavContainer'
import Notifications from 'containers/NotificationContainer'

import type { Match } from 'react-router-dom'
import MainTemplate from './templates/MainTemplate'
import Modal from 'containers/widgets/modals/ModalContainer'
import MailVerifyContainer from 'containers/pages/MailVerifyContainer'
import Main from './structures/Main'
import MainFooter from './structures/footer/MainFooter'
import Voucher from './pages/Voucher'
import NotFound from './pages/NotFound'
import LandingContainer from 'containers/pages/LandingContainer'

import { APP_TITLE, paratiiTheme } from 'constants/ApplicationConstants'

import type VideoRecord from 'records/VideoRecords'
import type { Map } from 'immutable'

type Props = {
  initializeApp: () => void,
  match: Match,
  videos: Map<string, VideoRecord>,
  isWalletSecured: boolean,
  history: History
}

type State = {
  isBusy: boolean
}

class App extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.props.initializeApp()
    this.state = {
      isBusy: this.props.videos ? this.props.videos.size > 0 : false
    }
  }

  componentDidUpdate () {
    const onUnload = !this.state.isBusy
      ? undefined
      : e => {
        return true
      }
    window.onbeforeunload = onUnload
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.videos) {
      this.setState({
        isBusy: nextProps.videos.size > 0
      })
    }
  }

  render () {
    const { match, isWalletSecured, history } = this.props
    return (
      <ThemeProvider theme={paratiiTheme}>
        <DocumentTitle title={APP_TITLE}>
          <MainTemplate>
            <Modal />
            <Notifications />
            <MainHeader />
            {isWalletSecured ? <UserNav /> : null}
            <Main
              landing={match.isExact}
              play={history.location.pathname.indexOf('/play') > -1}
              isWalletSecured={isWalletSecured}
            >
              <Switch>
                <Route exact path="/" component={LandingContainer} />
                <Route
                  path={`${match.url}verify`}
                  component={MailVerifyContainer}
                />
                <Route
                  path={`${match.url}profile`}
                  component={ProfileContainer}
                  exact
                />
                <Route
                  path={`${match.url}profile/edit`}
                  component={ProfileEditContainer}
                />
                <Route
                  path={`${match.url}profile/my-videos`}
                  component={ProfileMyVideosContainer}
                />
                <Route
                  path={`${match.url}upload/:id`}
                  component={VideoManager}
                />
                <Route path={`${match.url}upload`} component={VideoManager} />
                <Route path={`${match.url}voucher`} component={Voucher} />
                <Route path={`${match.url}debug`} component={DebugContainer} />
                <Route
                  path={`${match.url}wallet`}
                  render={() =>
                    isWalletSecured ? <WalletContainer /> : <Redirect to="/" />
                  }
                />
                <Route path={`${match.url}edit/:id`} component={EditVideo} />
                <Route
                  path={`${match.url}play/:id`}
                  component={PlayContainer}
                />
                <Route
                  path={`${match.url}embed/:id`}
                  component={PlayContainer}
                />
                <Route
                  path={`${match.url}search`}
                  component={SearchResultsContainer}
                />
                <Route component={NotFound} />
              </Switch>
            </Main>
            {/* <DebugContainer /> */}
            <MainFooter />
          </MainTemplate>
        </DocumentTitle>
      </ThemeProvider>
    )
  }
}

export default App
