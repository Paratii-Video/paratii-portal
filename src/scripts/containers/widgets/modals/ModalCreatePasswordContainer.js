/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal, closeModal } from 'actions/ModalActions'
import { secureKeystore } from 'actions/UserActions'
import { getContext } from 'selectors/index.js'
import ModalCreatePassword from 'components/widgets/modals/ModalCreatePassword'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  getContext: getContext(state)
})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  closeModal: bindActionCreators(closeModal, dispatch),
  secureKeystore: bindActionCreators(secureKeystore, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePassword)
