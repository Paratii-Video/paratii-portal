/* @flow */

import { createAction } from 'redux-actions'

import {
  ADD_DO_NOT_TIP_VIDEO,
  SET_USER_IS_TIPPING
} from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

export const addDoNotTipVideo: (
  id: string
) => Action<{ id: string }> = createAction(ADD_DO_NOT_TIP_VIDEO, id => ({ id }))

export const setUserIsTipping: (
  isTipping: boolean
) => Action<{ isTipping: boolean }> = createAction(
  SET_USER_IS_TIPPING,
  isTipping => ({ isTipping })
)
