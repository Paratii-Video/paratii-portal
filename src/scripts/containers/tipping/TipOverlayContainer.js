/* @flow */

import { connect } from 'react-redux'

import { show } from 'react-notification-system-redux'

import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getLastSecuredTimestamp } from 'selectors/index'

import { setUserIsTipping, addDoNotTipVideo } from 'actions/TippingActions'

import TipOverlay from 'components/tipping/TipOverlay'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  lastSecuredTimestamp: getLastSecuredTimestamp(state),
  video: getPlayingVideo(state)
})

const mapDispatchToProps = {
  notification: show,
  setUserIsTipping,
  addDoNotTipVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOverlay)
