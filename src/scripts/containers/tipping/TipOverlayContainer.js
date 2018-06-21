/* @flow */

import { connect } from 'react-redux'

import { show } from 'react-notification-system-redux'

import {
  balancesAreBeingLoaded,
  getFormattedPtiBalance
} from 'selectors/UserSelectors'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import { getLastSecuredTimestamp } from 'selectors/index'

import { loadBalances } from 'actions/UserActions'
import { setUserIsTipping, addDoNotTipVideo } from 'actions/TippingActions'

import TipOverlay from 'components/tipping/TipOverlay'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  balancesAreBeingLoaded: balancesAreBeingLoaded(state),
  ptiBalance: getFormattedPtiBalance(state),
  lastSecuredTimestamp: getLastSecuredTimestamp(state),
  video: getPlayingVideo(state)
})

const mapDispatchToProps = {
  addDoNotTipVideo,
  loadBalances,
  notification: show,
  setUserIsTipping
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOverlay)
