/* @flow */

import { Record as ImmutableRecord, List as ImmutableList } from 'immutable'

import Player from 'records/PlayerRecords'

class Search extends ImmutableRecord({
  currentInputText: '',
  results: ImmutableList()
}) {
  currentInputText: string
  results: ImmutableList<Player>
}

export default Search
