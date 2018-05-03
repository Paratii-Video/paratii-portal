/* @flow */

import { createAction } from 'redux-actions'

import {
  SEARCH_INPUT_CHANGED,
  SEARCH_STARTED,
  SEARCH_FAILED,
  SEARCH_RESULTS_LOADED,
  ADDITIONAL_SEARCH_STARTED,
  ADDITIONAL_SEARCH_RESULTS_LOADED,
  ADDITIONAL_SEARCH_FAILED
} from 'constants/ActionConstants'
import { SEARCH_BATCH_SIZE } from 'constants/SearchConstants'
import paratii from 'utils/ParatiiLib'
import { getCurrentSearchText, getNextSearchOffset } from 'selectors/index'

import type { Dispatch } from 'redux'
import type { SearchResults } from 'types/SearchTypes'
import type { RootState, Action, VideoInfo } from 'types/ApplicationTypes'

export const searchInputChanged = createAction(SEARCH_INPUT_CHANGED)
export const searchStarted: () => Action<void> = createAction(SEARCH_STARTED)
export const searchResultsLoaded: ({ results: Array<VideoInfo> }) => Action<{
  results: Array<VideoInfo>
}> = createAction(SEARCH_RESULTS_LOADED)
export const searchFailed: () => Action<void> = createAction(SEARCH_FAILED)
export const additionalSearchStarted: () => Action<void> = createAction(
  ADDITIONAL_SEARCH_STARTED
)
export const additionSearchResultsLoaded: ({
  results: Array<VideoInfo>
}) => Action<{
  results: Array<VideoInfo>
}> = createAction(ADDITIONAL_SEARCH_RESULTS_LOADED)
export const additionSearchFailed: () => Action<void> = createAction(
  ADDITIONAL_SEARCH_FAILED
)

export const searchForVideos = ({ keyword }: Object = {}) => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
): Promise<void> => {
  if (keyword) {
    dispatch(searchStarted())
    try {
      const searchOffset: number = 0
      const searchResults: SearchResults = await paratii.vids.search({
        keyword,
        limit: SEARCH_BATCH_SIZE,
        offset: 0
      })
      const results: Array<VideoInfo> = searchResults.results
      dispatch(
        searchResultsLoaded({
          hasNext: searchResults.hasNext,
          nextSearchOffset: searchOffset + results.length,
          lastSearchedForText: keyword,
          results: searchResults.results
        })
      )
    } catch (e) {
      dispatch(searchFailed())
    }
  }
}

export const searchForMoreVideos = () => async (
  dispatch: Dispatch<*>,
  getState: () => RootState
): Promise<void> => {
  const keyword: string = getCurrentSearchText(getState())
  const nextSearchOffset: number = getNextSearchOffset(getState())

  if (keyword) {
    dispatch(additionalSearchStarted())
    try {
      const searchResults: SearchResults = await paratii.vids.search({
        keyword,
        limit: SEARCH_BATCH_SIZE,
        offset: nextSearchOffset
      })

      const results: Array<VideoInfo> = searchResults.results || []
      dispatch(
        additionSearchResultsLoaded({
          hasNext: searchResults.hasNext,
          nextSearchOffset: nextSearchOffset + results.length,
          results: searchResults.results
        })
      )
    } catch (e) {
      dispatch(additionSearchFailed())
    }
  }
}
