/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getFormattedPtiBalance } from 'selectors/UserSelectors'
import { loadBalances } from 'actions/UserActions'
import PTIBalance from 'components/widgets/PTIBalance'

import type { Dispatch } from 'redux'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  balance: getFormattedPtiBalance(state)
})

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  loadBalances: bindActionCreators(loadBalances, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PTIBalance)
