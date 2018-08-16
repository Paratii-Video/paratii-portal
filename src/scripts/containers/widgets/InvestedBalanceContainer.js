/* @flow */

import { connect } from 'react-redux'

import { getTotalStakedPti, getFormattedPtiBalance } from 'selectors/UserSelectors'
import InvestedBalance from 'components/widgets/InvestedBalance'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  balance: getFormattedPtiBalance(state),
  stakedPTI: getTotalStakedPti(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InvestedBalance)
