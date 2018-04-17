/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import Player from 'records/PlayerRecords'

class Search extends ImmutableRecord({
  currentSearchText: '',
  results: ImmutableList()
}) {
  currentSearchText: string
  results: ImmutableList<Player>
}

export const _getCurrentSearchText = (search: Search): string =>
  search.get('currentSearchText')

export default Search
