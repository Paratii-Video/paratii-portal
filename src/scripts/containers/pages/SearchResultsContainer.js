/* @flow */

import { connect } from 'react-redux'

import type { RootState } from 'types/ApplicationTypes'

import SearchResults from 'components/pages/SearchResults'
import { searchForMoreVideos } from 'actions/SearchActions'
import { getSearchResultsLoading } from 'selectors/SearchSelectors'
import {
  getHasNext,
  getLastSearchedForText,
  getSearchResults
} from 'selectors/index'

const mapStateToProps = (state: RootState): Object => ({
  hasNext: getHasNext(state),
  results: getSearchResults(state),
  resultsLoading: getSearchResultsLoading(state),
  searchTerm: getLastSearchedForText(state)
})

const mapDispatchToProps: Object = {
  searchForMoreVideos
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
