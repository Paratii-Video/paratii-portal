/* @flow */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ThemeProvider } from 'styled-components'

import { paratiiTheme } from 'constants/ApplicationConstants'

const renderRawTranslatable = (children: any) =>
  renderToString(<ThemeProvider theme={paratiiTheme}>{children}</ThemeProvider>)

export default renderRawTranslatable
