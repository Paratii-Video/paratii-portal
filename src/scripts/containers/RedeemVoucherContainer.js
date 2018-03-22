/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'

import RedeemVoucher from 'components/widgets/RedeemVoucher'
import { loadBalances } from 'actions/UserActions'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  loadBalances: bindActionCreators(loadBalances, dispatch),
  notification: bindActionCreators(show, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RedeemVoucher)
