/* @flow */

import { connect } from 'react-redux'

import type { RootState } from 'types/ApplicationTypes'

import SearchResults from 'components/pages/SearchResults'
import { getSearchResults } from 'selectors/index'

const mapStateToProps = (state: RootState): Object => ({
  results: getSearchResults(state)
})

export default connect(mapStateToProps)(SearchResults)
