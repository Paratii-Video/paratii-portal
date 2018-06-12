/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserWallet, loadBalances } from 'actions/UserActions'
import { getUser, getUserNavStatus } from 'selectors/index'
import { closeUserNav } from 'actions/UserNavActions'
import {
  getFormattedPtiBalance,
  getUserAddress,
  getIsSecure
} from 'selectors/UserSelectors'
import UserNav from 'components/UserNav'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  balance: getFormattedPtiBalance(state),
  user: getUser(state),
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state),
  showUserNav: getUserNavStatus(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch),
  closeUserNav: bindActionCreators(closeUserNav, dispatch),
  loadBalances: bindActionCreators(loadBalances, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)
