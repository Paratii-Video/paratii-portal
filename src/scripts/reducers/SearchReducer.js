/* @flow */

import { handleActions } from 'redux-actions'
import { List as ImmutableList } from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import {
  SEARCH_INPUT_CHANGED,
  SEARCH_STARTED,
  SEARCH_RESULTS_LOADED,
  SEARCH_FAILED
} from 'constants/ActionConstants'
import Video from 'records/VideoRecords'
import Search from 'records/SearchRecords'

import type { Action, VideoInfo } from 'types/ApplicationTypes'

const reducer = {
  [SEARCH_INPUT_CHANGED]: (
    state: Search,
    action: Action<{ value: string }>
  ): Search => state.set('currentSearchText', action.payload.value),
  [SEARCH_STARTED]: (state: Search): Search =>
    state.set('searchRequestStatus', REQUEST_STATUS.PENDING),
  [SEARCH_RESULTS_LOADED]: (
    state: Search,
    action: Action<{ hasNext: boolean, results: Array<VideoInfo> }>
  ): Search =>
    state.merge({
      hasNext: action.payload.hasNext,
      results: ImmutableList(
        action.payload.results.map(
          (video: VideoInfo): Video => new Video(video)
        )
      ),
      searchRequestStatus: REQUEST_STATUS.SUCCEEDED
    }),
  [SEARCH_FAILED]: (state: Search): Search =>
    state.set('searchRequestStatus', REQUEST_STATUS.FAILED)
}

export default handleActions(reducer, new Search())
