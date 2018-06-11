import React from 'react'

import TranslationContext from 'utils/translations/TranslationContext'

const ConnectToTranslator = Component => {
  const WrappedComponent = props => (
    <TranslationContext.Consumer>
      {translator => <Component {...props} translator={translator} />}
    </TranslationContext.Consumer>
  )

  return WrappedComponent
}
export default ConnectToTranslator
