/* @flow */

import { connect } from 'react-redux'
import { show } from 'react-notification-system-redux'

import Landing from 'components/pages/Landing'

const mapDispatchToProps = {
  showNotification: show
}

export default connect(undefined, mapDispatchToProps)(Landing)
