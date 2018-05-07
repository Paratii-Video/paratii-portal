/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserWallet } from 'actions/UserActions'
import { getUserAddress, getIsSecure } from 'selectors/UserSelectors'
import { getUser } from 'selectors/index'
import { show } from 'react-notification-system-redux'
import Profile from 'components/Profile'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  user: getUser(state),
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  showNotification: bindActionCreators(show, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
