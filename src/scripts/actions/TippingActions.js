/* @flow */

import { createAction } from 'redux-actions'

import { TIP_VIDEO_COMPLETED } from 'constants/ActionConstants'

import type { Action } from 'types/ApplicationTypes'

export const tipVideoCompleted: (
  id: string
) => Action<{ id: string }> = createAction(TIP_VIDEO_COMPLETED, id => ({ id }))
