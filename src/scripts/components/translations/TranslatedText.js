/* @flow */

import React from 'react'

import ConnectToTranslator from './ConnectToTranslator'

import type { Translator } from 'types/TranslationTypes'

type Props = {
  message: string,
  options?: ?Object,
  translator?: Translator
}

class TranslatedText extends React.Component<Props> {
  render () {
    const { message, options, translator } = this.props

    if (!translator) {
      return ''
    }

    return translator({ key: message, options })
  }
}

export default ConnectToTranslator(TranslatedText)
