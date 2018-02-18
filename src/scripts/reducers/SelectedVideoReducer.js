/* @flow */

import { handleActions } from 'redux-actions'
import { VIDEO_SELECT } from 'constants/ActionConstants'
import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [VIDEO_SELECT]: (
    state: string,
    { payload }: Action<{ id: string }>
  ): string => {
    return payload.id
  }
}

export default handleActions(reducer, null)
