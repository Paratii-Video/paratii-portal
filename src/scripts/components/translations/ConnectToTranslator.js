import React from 'react'

import { TranslationContext } from 'utils/TranslationUtils'

const ConnectToTranslator = Component => {
  const WrappedComponent = props => (
    <TranslationContext.Consumer>
      {translator => <Component {...props} translator={translator} />}
    </TranslationContext.Consumer>
  )

  return WrappedComponent
}
export default ConnectToTranslator
