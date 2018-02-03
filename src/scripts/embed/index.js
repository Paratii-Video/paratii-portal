/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import styled from 'styled-components'

import { getRoot } from 'utils/AppUtils'
import PlayContainer from 'containers/PlayContainer'
import createStore from 'scripts/createStore'

import 'styles/embed/index.scss'

import type { RouteMatch } from 'types/ApplicationTypes'

type Props = {
  match: RouteMatch
}

const store = createStore()

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

class EmbedApp extends React.Component<Props, void> {
  render () {
    const { match } = this.props

    return (
      <Wrapper>
        <Route exact path={`${match.url}embed/:id`} component={PlayContainer} />
      </Wrapper>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={EmbedApp} />
    </BrowserRouter>
  </Provider>,
  getRoot()
)
