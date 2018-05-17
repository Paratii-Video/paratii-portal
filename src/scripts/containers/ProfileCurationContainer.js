/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserWallet, setUserData } from 'actions/UserActions'
import { getUserAddress, getIsSecure } from 'selectors/UserSelectors'
import { getUser } from 'selectors/index'
import { show } from 'react-notification-system-redux'
import ProfileCuration from 'components/ProfileCuration'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  user: getUser(state),
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  showNotification: bindActionCreators(show, dispatch),
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch),
  setUserData: bindActionCreators(setUserData, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCuration)
