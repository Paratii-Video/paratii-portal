/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'react-notification-system-redux'
import { openModal } from 'actions/ModalActions'
import ModalShowSeed from 'components/widgets/modals/ModalShowSeed'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = dispatch => ({
  openModal: bindActionCreators(openModal, dispatch),
  showNotification: bindActionCreators(show, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowSeed)
