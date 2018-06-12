/* @flow */

import React from 'react'

import { HTML_KEY_REGEX } from 'constants/TranslationsConstants'
import ConnectToTranslator from 'utils/translations/ConnectToTranslator'
import renderRawTranslatable from 'utils/translations/renderRawTranslatable'

import type { Translator } from 'types/TranslationTypes'

type Props = {
  message: string,
  options?: Object,
  translator?: Translator
}

class TranslatedText extends React.Component<Props> {
  static defaultProps = {
    options: {}
  }

  render () {
    const { message, options, translator } = this.props

    if (!translator) {
      return ''
    }

    if (HTML_KEY_REGEX.test(message)) {
      const processOptions: Object = !options
        ? {}
        : Object.keys(options).reduce(
          // $FlowFixMe
          (reducedOptions: Object, optionsKey: string): Object => {
            reducedOptions[optionsKey] = renderRawTranslatable(
              options[optionsKey]
            )
            return reducedOptions
          },
          {}
        )

      const translatedString: string = translator({
        key: message,
        options: processOptions
      })
      return <span dangerouslySetInnerHTML={{ __html: translatedString }} />
    }

    return translator({ key: message, options })
  }
}

export default ConnectToTranslator(TranslatedText)
