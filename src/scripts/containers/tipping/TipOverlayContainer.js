/* @flow */

import { connect } from 'react-redux'

import { show } from 'react-notification-system-redux'

import TipOverlay from 'components/tipping/TipOverlay'

const mapDispatchToProps = {
  notification: show
}

export default connect(undefined, mapDispatchToProps)(TipOverlay)
