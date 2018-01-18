/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import { Paratii } from 'paratii-lib/lib/paratii'
import Root from 'components/Root'
import { getRoot } from 'utils/AppUtils'
import createStore from 'scripts/createStore'
import 'styles/app.scss'

const store = createStore()

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Root />
      </AppContainer>
    </Provider>,
    getRoot()
  )
}

if (process.env.NODE_ENV !== 'production') {
  window.paratii = new Paratii({
    provider: 'http://localhost:8545/rpc/',
    address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
    privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
  })
  window.paratii.eth.deployContracts()
    .then(renderApp)
} else {
  window.paratii = new Paratii({
    provider: 'http://localhost:8545/rpc/',
    address: '0x9e2d04eef5b16CFfB4328Ddd027B55736407B275',
    privateKey: '399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'
  })
  renderApp()
}

if (module.hot) {
  module.hot.accept('components/Root', () => {
    const NextRoot = require('components/Root').default
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <NextRoot />
        </AppContainer>
      </Provider>,
      getRoot()
    )
  })
}
