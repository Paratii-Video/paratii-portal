/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openModal } from 'actions/ModalActions'
import { setContext } from 'actions/GlobalActions'
import ModalSecure from 'components/widgets/modals/ModalSecure'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  setContext: bindActionCreators(setContext, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalSecure)
