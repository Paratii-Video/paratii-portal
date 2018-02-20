/* @flow */

import { handleActions } from 'redux-actions'

import { UPLOAD_VIDEO_SELECT } from 'constants/ActionConstants'
import Uploader from 'records/UploaderRecords'

import type { Action } from 'types/ApplicationTypes'

const reducer = {
  [UPLOAD_VIDEO_SELECT]: (
    state: Uploader,
    { payload }: Action<{ id: string } | null>
  ): string => state.set('selectedVideoId', payload || '')
}

export default handleActions(reducer, new Uploader())
