/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Play from 'components/Play'
import {
  togglePlayPause,
  attemptPlay,
  playerVideoSelect
} from 'actions/PlayerActions'
import { fetchVideo } from 'actions/VideoActions'
import { getIsPlaying, getIsAttemptingPlay } from 'selectors/index'
import { getPlayingVideo } from 'selectors/PlayerSelectors'
import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (
  state: RootState,
  ownProps: { isEmbed?: boolean }
) => ({
  video: getPlayingVideo(state),
  isPlaying: getIsPlaying(state),
  isAttemptingPlay: getIsAttemptingPlay(state),
  isEmbed: ownProps.isEmbed
})

const mapDispatchToProps = dispatch => ({
  fetchVideo: bindActionCreators(fetchVideo, dispatch),
  setSelectedVideo: bindActionCreators(playerVideoSelect, dispatch),
  togglePlayPause: bindActionCreators(togglePlayPause, dispatch),
  attemptPlay: bindActionCreators(attemptPlay, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)
