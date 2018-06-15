/* @flow */

import { connect } from 'react-redux'

import VideoOverlay from 'components/VideoOverlay'
import { getActivePlugin } from 'selectors/index'
import {
  getCurrentPlaybackLevel,
  getPlaybackLevelsSorted
} from 'selectors/PlayerSelectors'
import { askForTip } from 'selectors/TippingSelectors'
import { playerToggleActivePlugin } from 'actions/PlayerActions'

const mapStateToProps = state => ({
  activePlugin: getActivePlugin(state),
  askForTip: askForTip(state),
  currentPlaybackLevel: getCurrentPlaybackLevel(state),
  playbackLevels: getPlaybackLevelsSorted(state)
})

const mapDispatchToProps = {
  toggleActivePlugin: playerToggleActivePlugin
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverlay)
