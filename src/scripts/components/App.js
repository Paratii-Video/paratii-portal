/* @flow */

import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import DocumentTitle from 'react-document-title'
import { ThemeProvider } from 'styled-components'

import ProfileContainer from 'containers/ProfileContainer'

import ProfileEditContainer from 'containers/ProfileEditContainer'
import DebugContainer from 'containers/DebugContainer'
import WalletContainer from 'containers/WalletContainer'
import MainHeader from 'containers/MainHeaderContainer'
import Notifications from 'containers/NotificationContainer'
import Loader from 'components/foundations/Loader'
import MainTemplate from './templates/MainTemplate'
import Modal from 'containers/widgets/modals/ModalContainer'
import MailVerifyContainer from 'containers/pages/MailVerifyContainer'
import Main from './structures/Main'
import MainFooter from './structures/footer/MainFooter'
import Home from './pages/Home'

import { APP_TITLE, paratiiTheme } from 'constants/ApplicationConstants'

import type { Match } from 'react-router-dom'
import type VideoRecord from 'records/VideoRecords'
import type { Map } from 'immutable'

const ComponentLoader = () => <Loader width="50px" height="50px" />

const PlayContainerLoadable = Loadable({
  loader: () => import('containers/PlayContainer'),
  loading: ComponentLoader
})

const SearchResultsContainerLoadable = Loadable({
  loader: () => import('containers/pages/SearchResultsContainer'),
  loading: ComponentLoader
})

const VideoManagerLoadable = Loadable({
  loader: () => import('containers/VideoManagerContainer'),
  loading: ComponentLoader
})

const VoucherLoadable = Loadable({
  loader: () => import('./pages/Voucher'),
  loading: ComponentLoader
})

const NotFoundLoadable = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: ComponentLoader
})

type Props = {
  initializeApp: () => void,
  match: Match,
  videos: Map<string, VideoRecord>,
  isWalletSecured: boolean
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
    const { match, isWalletSecured } = this.props

    return (
      <ThemeProvider theme={paratiiTheme}>
        <DocumentTitle title={APP_TITLE}>
          <MainTemplate>
            <Modal />
            <Notifications />
            <MainHeader />

            <Main>
              <Switch>
                <Route exact path="/" component={Home} />
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
                  path={`${match.url}upload/:id`}
                  component={VideoManagerLoadable}
                />
                <Route
                  path={`${match.url}upload`}
                  component={VideoManagerLoadable}
                />
                <Route
                  path={`${match.url}voucher`}
                  component={VoucherLoadable}
                />
                <Route path={`${match.url}debug`} component={DebugContainer} />
                <Route
                  path={`${match.url}wallet`}
                  render={() =>
                    isWalletSecured ? <WalletContainer /> : <Redirect to="/" />
                  }
                />
                <Route
                  path={`${match.url}play/:id`}
                  component={PlayContainerLoadable}
                />
                <Route
                  path={`${match.url}embed/:id`}
                  component={PlayContainerLoadable}
                />
                <Route
                  path={`${match.url}search`}
                  component={SearchResultsContainerLoadable}
                />
                <Route component={NotFoundLoadable} />
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
