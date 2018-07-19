/* @flow */

import { connect } from 'react-redux'

import { show } from 'react-notification-system-redux'

import { getPtiBalance } from 'selectors/UserSelectors'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getLastSecuredTimestamp } from 'selectors/index'

import { setUserIsTipping, addDoNotTipVideo } from 'actions/TippingActions'

import TipOverlay from 'components/tipping/TipOverlay'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  ptiBalance: getPtiBalance(state),
  lastSecuredTimestamp: getLastSecuredTimestamp(state),
  video: getPlayingVideo(state)
})

const mapDispatchToProps = {
  addDoNotTipVideo,
  notification: show,
  setUserIsTipping
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOverlay)
