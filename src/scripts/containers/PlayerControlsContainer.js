/* @flow */

import { connect } from 'react-redux'

import PlayerControls from 'components/PlayerControls'
import {
  getIsPlaying,
  getPlayerCurrentTimeSeconds,
  getPlayerCurrentBufferedTimeSeconds
} from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState): Object => ({
  video: getPlayingVideo(state),
  isPlaying: getIsPlaying(state),
  currentTimeSeconds: getPlayerCurrentTimeSeconds(state),
  currentBufferedTimeSeconds: getPlayerCurrentBufferedTimeSeconds(state)
})

export default connect(mapStateToProps)(PlayerControls)
