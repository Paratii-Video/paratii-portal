/* @flow */

import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import TranslationContext from 'utils/translations/TranslationContext'

import type { Store } from 'redux'
import type { Translator } from 'types/TranslationTypes'

type Props = {
  children: any,
  store: Store<*>,
  translator: Translator
}

const PortalWrapper = ({ children, store, translator }: Props) => (
  <TranslationContext.Provider value={translator}>
    <Provider store={store}>
      <AppContainer>{children}</AppContainer>
    </Provider>
  </TranslationContext.Provider>
)

export default PortalWrapper
