/* @flow */

import { connect } from 'react-redux'
import { getUserAddress, getIsSecure } from 'selectors/UserSelectors'
import UserBadge from '../components/widgets/UserBadge'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  userAddress: getUserAddress(state),
  isWalletSecured: getIsSecure(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(UserBadge)
