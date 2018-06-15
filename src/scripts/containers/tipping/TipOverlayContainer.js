/* @flow */

import { connect } from 'react-redux'

import { show } from 'react-notification-system-redux'

import { tipVideoCompleted } from 'actions/TippingActions'

import TipOverlay from 'components/tipping/TipOverlay'

const mapDispatchToProps = {
  notification: show,
  tipVideoCompleted
}

export default connect(undefined, mapDispatchToProps)(TipOverlay)
