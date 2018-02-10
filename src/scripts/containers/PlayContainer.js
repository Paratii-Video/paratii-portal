/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Play from 'components/Play'
import { fetchVideo, selectVideoAction } from 'actions/VideoActions'
import { togglePlayPause, attemptPlay } from 'actions/PlayerActions'
import { getVideo, getIsPlaying, getIsAttemptingPlay } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (
  state: RootState,
  ownProps: { isEmbed?: boolean }
) => ({
  video: getVideo(state),
  isPlaying: getIsPlaying(state),
  isAttemptingPlay: getIsAttemptingPlay(state),
  isEmbed: ownProps.isEmbed
})

const mapDispatchToProps = dispatch => ({
  fetchVideo: bindActionCreators(fetchVideo, dispatch),
  setSelectedVideo: bindActionCreators(selectVideoAction, dispatch),
  togglePlayPause: bindActionCreators(togglePlayPause, dispatch),
  attemptPlay: bindActionCreators(attemptPlay, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)
