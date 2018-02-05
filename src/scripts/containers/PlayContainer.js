/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Play from 'components/Play'
import { fetchVideo } from 'actions/VideoActions'
import { getVideo as getSelectedVideoFromState } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => {
  let video = getSelectedVideoFromState(state)
  // if (!this.props.video) {
  //   this.props.video = this.props.fetchVideo(videoId)
  // }
  return {
    video: video
  }
}

const mapDispatchToProps = dispatch => ({
  fetchVideo: bindActionCreators(fetchVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)
