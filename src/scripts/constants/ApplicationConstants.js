/* @flow */

import Animation from 'components/foundations/base/Animation'
import Sizes from 'components/foundations/base/Sizes'
import Themes from 'components/foundations/base/Themes'
import Typography from 'components/foundations/base/Typography'

import type { Theme } from 'types/ApplicationTypes'

export const paratiiTheme: Theme = {
  animation: Animation,
  fonts: Typography,
  sizes: Sizes,
  colors: Themes.dark
}

const createRequestStatus = (status: string) => `REQUEST_${status}`

export const REQUEST_STATUS = {
  NOT_STARTED: createRequestStatus('NOT_STARTED'),
  PENDING: createRequestStatus('PENDING'),
  SUCCEEDED: createRequestStatus('SUCCEEDED'),
  FAILED: createRequestStatus('FAILED')
}
