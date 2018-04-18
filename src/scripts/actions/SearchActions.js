/* @flow */

import { createAction } from 'redux-actions'

import {
  SEARCH_INPUT_CHANGED,
  SEARCH_STARTED,
  SEARCH_RESULTS_LOADED,
  SEARCH_FAILED
} from 'constants/ActionConstants'
import paratii from 'utils/ParatiiLib'

import type { Dispatch } from 'redux'
import type { SearchResults } from 'types/SearchTypes'
import type { RootState, Action, VideoInfo } from 'types/ApplicationTypes'

export const searchInputChanged = createAction(SEARCH_INPUT_CHANGED)

export const searchStarted: () => Action<void> = createAction(SEARCH_STARTED)
export const searchResultsLoaded: ({ results: Array<VideoInfo> }) => Action<{
  results: Array<VideoInfo>
}> = createAction(SEARCH_RESULTS_LOADED)
export const searchFailed: () => Action<void> = createAction(SEARCH_FAILED)

export const searchForVideos = ({ keyword }: Object = {}) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
): Promise<void> => {
  if (keyword) {
    dispatch(searchStarted())
    try {
      const searchResults: SearchResults = await paratii.vids.search({
        keyword
      })
      dispatch(searchResultsLoaded({ results: searchResults.results }))
    } catch (e) {
      dispatch(searchFailed())
    }
  }
}
