/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Play from 'components/Play'
import { fetchVideo } from 'actions/VideoActions'
import { togglePlayPause } from 'actions/PlayerActions'
import { getVideo, getIsPlaying } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  video: getVideo(state),
  isPlaying: getIsPlaying(state)
})

const mapDispatchToProps = dispatch => ({
  fetchVideo: bindActionCreators(fetchVideo, dispatch),
  togglePlayPause: bindActionCreators(togglePlayPause, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)
