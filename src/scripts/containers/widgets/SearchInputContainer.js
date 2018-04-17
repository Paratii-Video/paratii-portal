/* @flow */

import { connect } from 'react-redux'

import { searchInputChanged } from 'actions/SearchActions'
import { getCurrentSearchText } from 'selectors/index'
import SearchInput from 'components/widgets/SearchInput'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState): Object => ({
  currentSearchText: getCurrentSearchText(state)
})

const mapDispatchToProps: Object = {
  onSearchInputChange: searchInputChanged
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
