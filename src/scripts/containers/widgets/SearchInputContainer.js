/* @flow */

import { connect } from 'react-redux'

import { searchInputChanged, searchForVideos } from 'actions/SearchActions'
import { getCurrentSearchText } from 'selectors/index'
import SearchInput from 'components/widgets/SearchInput'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState): Object => ({
  currentSearchText: getCurrentSearchText(state)
})

const mapDispatchToProps: Object = {
  search: searchForVideos,
  onSearchInputChange: searchInputChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
