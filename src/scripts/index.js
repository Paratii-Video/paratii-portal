/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import 'promise-polyfill/src/polyfill'

import Root from 'components/Root'
import { getRoot } from 'utils/AppUtils'
import { initializeTranslator } from 'utils/TranslationUtils'
import createStore from 'scripts/createStore'
import 'styles/app.scss'

const store = createStore()

const translator = initializeTranslator()
const TranslationContext = React.createContext()

ReactDOM.render(
  <TranslationContext.Provider value={translator}>
    <Provider store={store}>
      <AppContainer>
        <Root />
      </AppContainer>
    </Provider>
  </TranslationContext.Provider>,
  getRoot()
)

if (module.hot) {
  module.hot.accept('components/Root', () => {
    const NextRoot = require('components/Root').default
    ReactDOM.render(
      <TranslationContext.Provider value={translator}>
        <Provider store={store}>
          <AppContainer>
            <NextRoot />
          </AppContainer>
        </Provider>
      </TranslationContext.Provider>,
      getRoot()
    )
  })
}
