/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import 'promise-polyfill/src/polyfill'

import Root from 'components/Root'
import { getRoot } from 'utils/AppUtils'
import {
  initializeTranslator,
  TranslationContext
} from 'utils/TranslationUtils'
import createStore from 'scripts/createStore'
import 'styles/app.scss'

const store = createStore()

const translator = initializeTranslator()

type Props = {
  children: any
}

const PortalWrapper = ({ children }: Props) => (
  <TranslationContext.Provider value={translator}>
    <Provider store={store}>
      <AppContainer>{children}</AppContainer>
    </Provider>
  </TranslationContext.Provider>
)

ReactDOM.render(
  <PortalWrapper>
    <Root />
  </PortalWrapper>,
  getRoot()
)

if (module.hot) {
  module.hot.accept('components/Root', () => {
    const NextRoot = require('components/Root').default
    ReactDOM.render(
      <PortalWrapper>
        <NextRoot />
      </PortalWrapper>,
      getRoot()
    )
  })
}
