/* @flow */

import { connect } from 'react-redux'

import Play from 'components/Play'
import {
  attemptPlay,
  setFullscreen,
  playerVideoSelect,
  updateVideoTime,
  updateVideoBufferedTime,
  togglePlayPause,
  updateVolume,
  playbackLevelsLoaded,
  playbackLevelSet,
  playerReset
} from 'actions/PlayerActions'
import { fetchVideo } from 'actions/VideoActions'
import {
  getIsPlaying,
  getIsAttemptingPlay,
  getPlayerCurrentTimeSeconds,
  getPlayerCurrentBufferedTimeSeconds,
  getPlayerCurrentVolume,
  getActivePlugin
} from 'selectors/index'
import { getPlayingVideo, getDurationSeconds } from 'selectors/PlayerSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (
  state: RootState,
  ownProps: { isEmbed?: boolean }
) => ({
  video: getPlayingVideo(state),
  videoDurationSeconds: getDurationSeconds(state),
  isPlaying: getIsPlaying(state),
  isAttemptingPlay: getIsAttemptingPlay(state),
  isEmbed: ownProps.isEmbed,
  currentTimeSeconds: getPlayerCurrentTimeSeconds(state),
  currentBufferedTimeSeconds: getPlayerCurrentBufferedTimeSeconds(state),
  currentVolume: getPlayerCurrentVolume(state),
  activePlugin: getActivePlugin(state)
})

const mapDispatchToProps = {
  fetchVideo: fetchVideo,
  setSelectedVideo: playerVideoSelect,
  setFullscreen: setFullscreen,
  attemptPlay: attemptPlay,
  updateVideoTime: updateVideoTime,
  togglePlayPause: togglePlayPause,
  updateVideoBufferedTime: updateVideoBufferedTime,
  updateVolume: updateVolume,
  playbackLevelsLoaded: playbackLevelsLoaded,
  playbackLevelSet: playbackLevelSet,
  playerReset: playerReset
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
