/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import Video from 'records/VideoRecords'

import type { RequestStatus } from 'types/ApplicationTypes'

class Search extends ImmutableRecord({
  currentSearchText: '',
  hasNext: false,
  lastSearchedForText: '',
  nextSearchOffset: 0,
  results: ImmutableList(),
  searchRequestStatus: REQUEST_STATUS.NOT_STARTED,
  additionalSearchRequestStatus: REQUEST_STATUS.NOT_STARTED
}) {
  currentSearchText: string
  hasNext: boolean
  lastSearchedForText: string
  nextSearchOffset: number
  results: ImmutableList<Video>
  searchRequestStatus: RequestStatus
  additionalSearchRequestStatus: RequestStatus
}

export const _getCurrentSearchText = (search: Search): string =>
  search.get('currentSearchText')

export const _getHasNext = (search: Search): boolean => search.get('hasNext')

export const _getLastSearchedForText = (search: Search): string =>
  search.get('lastSearchedForText')

export const _getNextSearchOffset = (search: Search): number =>
  search.get('nextSearchOffset')

export const _getSearchResults = (search: Search): ImmutableList<Video> =>
  search.get('results')

export const _getSearchRequestStatus = (search: Search): RequestStatus =>
  search.get('searchRequestStatus')

export const _getAdditionalSearchRequestStatus = (
  search: Search
): RequestStatus => search.get('additionalSearchRequestStatus')

export default Search
