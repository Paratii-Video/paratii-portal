/* @flow */

import { connect } from 'react-redux'

import Modal from 'components/widgets/modals/Modal'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (
  state: RootState
) => (state.modal)

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
