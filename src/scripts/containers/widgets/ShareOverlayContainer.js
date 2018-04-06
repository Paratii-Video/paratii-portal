/* @flow */

import { connect } from 'react-redux'
import { show } from 'react-notification-system-redux'

import ShareOverlay from 'components/widgets/player/ShareOverlay'

const mapDispatchToProps = {
  showNotification: show
}

export default connect(undefined, mapDispatchToProps)(ShareOverlay)
