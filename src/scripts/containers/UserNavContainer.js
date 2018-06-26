/* @flow */

import { connect } from 'react-redux'
import { checkUserWallet, loadBalances } from 'actions/UserActions'
import { getUser, getUserNavStatus } from 'selectors/index'
import { closeUserNav } from 'actions/UserNavActions'
import {
  getRawPtiBalance,
  getFormattedPtiBalance,
  getUserAddress,
  getIsSecure
} from 'selectors/UserSelectors'
import UserNav from 'components/UserNav'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  rawBalance: getRawPtiBalance(state),
  balance: getFormattedPtiBalance(state),
  user: getUser(state),
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state),
  showUserNav: getUserNavStatus(state)
})

const mapDispatchToProps = {
  checkUserWallet,
  closeUserNav,
  loadBalances
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)
