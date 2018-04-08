/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal } from 'actions/ModalActions'
import Wallet from 'components/Wallet'
import { getUserAddress } from 'selectors/UserSelectors'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  userAddress: getUserAddress(state)
})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
