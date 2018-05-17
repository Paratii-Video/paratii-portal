/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUserWallet } from 'actions/UserActions'
import { getUserAddress, getIsSecure } from 'selectors/UserSelectors'
import UserNav from 'components/UserNav'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({
  checkUserWallet: bindActionCreators(checkUserWallet, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserNav)
