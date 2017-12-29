/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import Root from 'components/Root'
import createStore from 'scripts/createStore'
import initParatiiLib from 'utils/ParatiiLib'
import 'styles/app.scss'

initParatiiLib({
  provider: 'http://localhost:8545'
})

let root: ?Element = document.getElementById('root')

const store = createStore()

if (!root) {
  root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body && document.body.appendChild(root)
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <Root />
    </AppContainer>
  </Provider>,
  root
)

if (module.hot) {
  module.hot.accept('components/Root', () => {
    const NextRoot = require('components/Root').default
    if (root) {
      ReactDOM.render(
        <Provider store={store}>
          <AppContainer>
            <NextRoot />
          </AppContainer>
        </Provider>,
        root
      )
    }
  })
}
