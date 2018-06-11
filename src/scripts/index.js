/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import 'promise-polyfill/src/polyfill'

import Root from 'components/Root'
import PortalWrapper from 'components/PortalWrapper'
import { getRoot } from 'utils/AppUtils'
import initializeTranslator from 'utils/translations/initializeTranslator'
import createStore from 'scripts/createStore'

import 'styles/app.scss'

const store = createStore()

const translator = initializeTranslator()

ReactDOM.render(
  <PortalWrapper store={store} translator={translator}>
    <Root />
  </PortalWrapper>,
  getRoot()
)

if (module.hot) {
  module.hot.accept('components/Root', () => {
    const NextRoot = require('components/Root').default
    ReactDOM.render(
      <PortalWrapper store={store} translator={translator}>
        <NextRoot />
      </PortalWrapper>,
      getRoot()
    )
  })
}
