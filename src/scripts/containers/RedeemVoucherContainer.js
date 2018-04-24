/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'
import { getIsSecure } from 'selectors/UserSelectors'
import { openModal } from 'actions/ModalActions'
import RedeemVoucher from 'components/widgets/RedeemVoucher'
import { loadBalances, checkUserWallet } from 'actions/UserActions'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  loadBalances: bindActionCreators(loadBalances, dispatch),
  notification: bindActionCreators(show, dispatch),
  openModal: bindActionCreators(openModal, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RedeemVoucher)
