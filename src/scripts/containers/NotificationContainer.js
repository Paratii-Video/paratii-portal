import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import type { RootState } from 'types/ApplicationTypes'

import Notification from 'components/Notification'

const mapStateToProps = (state: RootState) => ({
  notifications: state.notifications
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
