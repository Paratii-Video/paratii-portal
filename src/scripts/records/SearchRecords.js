/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import Video from 'records/VideoRecords'

import type { RequestStatus } from 'types/ApplicationTypes'

class Search extends ImmutableRecord({
  currentSearchText: '',
  results: ImmutableList(),
  searchRequestStatus: REQUEST_STATUS.NOT_STARTED
}) {
  currentSearchText: string
  results: ImmutableList<Video>
  searchRequestStatus: RequestStatus
}

export const _getCurrentSearchText = (search: Search): string =>
  search.get('currentSearchText')

export const _getResults = (search: Search): ImmutableList<Video> =>
  search.get('results')

export default Search
