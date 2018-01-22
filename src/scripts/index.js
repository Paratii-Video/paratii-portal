/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import Root from 'components/Root'
import { getRoot } from 'utils/AppUtils'
import createStore from 'scripts/createStore'
import 'styles/app.scss'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Root />
    </AppContainer>
  </Provider>,
  getRoot()
)

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
