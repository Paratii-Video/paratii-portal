/* @flow */

import { _getVideoId } from 'records/VideoRecords'

import type { RootState } from 'types/ApplicationTypes'

export const getVideoId = (state: RootState): ?string =>
  _getVideoId(state.video)
