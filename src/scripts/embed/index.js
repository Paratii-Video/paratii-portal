/* @flow */

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

import { getRoot } from 'utils/AppUtils'
import TranslationContext from 'utils/translations/TranslationContext'
import initializeTranslator from 'utils/translations/initializeTranslator'
import PlayContainer from 'containers/PlayContainer'
import Notifications from 'containers/NotificationContainer'
import MainSvg from 'components/foundations/svgs/MainSvg'
import createStore from 'scripts/createStore'
import { paratiiTheme } from 'constants/ApplicationConstants'

import 'styles/embed/index.scss'

import { bindActionCreators } from 'redux'

import type { Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import { initializeApp } from 'actions/AppActions'

type Props = {
  match: Match,
  initializeApp: () => void
}

const store = createStore()

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const mapDispatchToProps = (dispatch: Dispatch<*>): Object => ({
  initializeApp: bindActionCreators(initializeApp, dispatch)
})

class EmbedApp extends React.Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.props.initializeApp()
  }

  render () {
    const { match } = this.props

    return (
      <ThemeProvider theme={paratiiTheme}>
        <Fragment>
          <Notifications />
          <Wrapper>
            <MainSvg />

            <Route
              exact
              path={`${match.url}embed/:id`}
              render={props => <PlayContainer isEmbed {...props} />}
            />
          </Wrapper>
        </Fragment>
      </ThemeProvider>
    )
  }
}

const EmbedContainer = connect(undefined, mapDispatchToProps)(EmbedApp)

const translator = initializeTranslator()

ReactDOM.render(
  <TranslationContext.Provider value={translator}>
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={EmbedContainer} />
      </BrowserRouter>
    </Provider>
  </TranslationContext.Provider>,
  getRoot()
)
