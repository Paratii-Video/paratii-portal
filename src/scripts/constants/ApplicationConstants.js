/* @flow */

import Animation from 'components/foundations/base/Animation'
import Sizes from 'components/foundations/base/Sizes'
import Themes from 'components/foundations/base/Themes'
import Typography from 'components/foundations/base/Typography'

import type { Theme } from 'types/ApplicationTypes'

export const APP_TITLE: string = 'Paratii'

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

export const TRANSITION_STATE = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
  EXITED: 'exited',
  APPEARING: 'appearing',
  APPEARED: 'appeared'
}

export const NOTIFICATION_LEVELS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

export const NOTIFICATION_POSITIONS = {
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  TOP_CENTER: 'tc',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl',
  BOTTOM_CENTER: 'bc'
}

export const NOTIFICATION_DELAY_MS: number = 500
