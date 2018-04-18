/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import Video from 'records/VideoRecords'

class Search extends ImmutableRecord({
  currentSearchText: '',
  results: ImmutableList()
}) {
  currentSearchText: string
  results: ImmutableList<Video>
}

export const _getCurrentSearchText = (search: Search): string =>
  search.get('currentSearchText')

export const _getResults = (search: Search): ImmutableList<Video> =>
  search.get('results')

export default Search
