/* @flow */

import { createAction } from 'redux-actions'

import {
  TIP_VIDEO_COMPLETED,
  SET_USER_IS_TIPPING
} from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

export const tipVideoCompleted: (
  id: string
) => Action<{ id: string }> = createAction(TIP_VIDEO_COMPLETED, id => ({ id }))

export const setUserIsTipping: (
  isTipping: boolean
) => Action<{ isTipping: boolean }> = createAction(
  SET_USER_IS_TIPPING,
  isTipping => ({ isTipping })
)
