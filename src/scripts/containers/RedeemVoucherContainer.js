/* @flow */

import { connect } from 'react-redux'
import type { RootState } from 'types/ApplicationTypes'
import { bindActionCreators } from 'redux'
import RedeemVoucher from 'components/widgets/RedeemVoucher'

import { show } from 'react-notification-system-redux'

const mapStateToProps = (state: RootState) => ({
  // notifications: state.notifications
})

const mapDispatchToProps = dispatch => ({
  notification: bindActionCreators(show, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RedeemVoucher)
