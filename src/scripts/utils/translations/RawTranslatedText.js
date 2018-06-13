import React from 'react'
import { renderToString } from 'react-dom/server'

import TranslatedText from 'components/translations/TranslatedText'

const RawTranslatedText = props => renderToString(<TranslatedText {...props} />)

export default RawTranslatedText
