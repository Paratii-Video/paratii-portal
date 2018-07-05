/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserWallet } from 'actions/UserActions'
import { openUserNav, closeUserNav } from 'actions/UserNavActions'
import { getUserNavStatus } from 'selectors/index'
import { getUserAddress, getIsSecure } from 'selectors/UserSelectors'
import MainHeader from 'components/structures/header/MainHeader'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state),
  showUserNav: getUserNavStatus(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch),
  openUserNav: bindActionCreators(openUserNav, dispatch),
  closeUserNav: bindActionCreators(closeUserNav, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)
