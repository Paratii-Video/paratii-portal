/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import Video from 'records/VideoRecords'

import type { RequestStatus } from 'types/ApplicationTypes'

class Search extends ImmutableRecord({
  currentSearchText: '',
  hasNext: false,
  results: ImmutableList(),
  searchRequestStatus: REQUEST_STATUS.NOT_STARTED
}) {
  currentSearchText: string
  hasNext: boolean
  results: ImmutableList<Video>
  searchRequestStatus: RequestStatus
}

export const _getCurrentSearchText = (search: Search): string =>
  search.get('currentSearchText')

export const _hasNext = (search: Search): boolean => search.get('hasNext')

export const _getSearchResults = (search: Search): ImmutableList<Video> =>
  search.get('results')

export const _getSearchRequestStatus = (search: Search): RequestStatus =>
  search.get('searchRequestStatus')

export default Search
