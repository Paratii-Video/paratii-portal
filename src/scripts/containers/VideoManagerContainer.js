import { Map } from 'immutable'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSelectedVideo } from 'actions/VideoActions'

import VideoRecord from 'records/VideoRecords'

import { getVideos, getVideo } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

import VideoList from './VideoListContainer'
import VideoForm from './VideoFormContainer'
import UploadFile from './UploadFileContainer'

import { CardContainer } from 'components/structures/Card'
import PTIGuide from 'components/widgets/PTIGuide'

type Props = {
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  setSelectedVideo: Object => void
}

class VideoManagerContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    props.setSelectedVideo(null)
  }

  render () {
    const selectedVideo =
      this.props.selectedVideo && this.props.selectedVideo.id

    let ConditionalVideoList
    if (this.props.videos.size > 0) {
      ConditionalVideoList = <VideoList />
    }
    return (
      <CardContainer>
        {ConditionalVideoList}
        {selectedVideo ? <VideoForm /> : <UploadFile />}
        {!selectedVideo && <PTIGuide />}
      </CardContainer>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  videos: getVideos(state),
  selectedVideo: getVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(setSelectedVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoManagerContainer
)
