/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal } from 'actions/ModalActions'
import { restoreKeystore } from 'actions/UserActions'
import { getPreviousModalName } from 'selectors/index'
import ModalRestoreAccount from 'components/widgets/modals/ModalRestoreAccount'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  previousModal: getPreviousModalName(state)
})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  restoreKeystore: bindActionCreators(restoreKeystore, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalRestoreAccount)
