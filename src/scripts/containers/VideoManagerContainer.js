import { Map } from 'immutable'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSelectedVideo } from 'actions/VideoActions'

import VideoRecord from 'records/VideoRecords'

import { getUploads, getVideo } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

import VideoList from './VideoListContainer'
import VideoForm from './VideoFormContainer'
import Debug from './DebugContainer'
import UploadFile from './UploadFileContainer'

import Card, { CardContainer } from 'components/structures/Card'

import Hidden from 'components/foundations/Hidden'

type Props = {
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  setSelectedVideo: Object => void
}

class VideoManagerContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    props.setSelectedVideo(null)
    this.onVideoListItemClicked = this.onVideoListItemClicked.bind(this)
  }

  onVideoListItemClicked (id: string) {
    this.props.setSelectedVideo(id)
  }

  render () {
    const uploads = this.props.videos
    const selectedVideo =
      this.props.selectedVideo && this.props.selectedVideo.id

    let videolist = null
    if (uploads.size > 0) {
      videolist = (
        <VideoList
          onItemClick={this.onVideoListItemClicked}
          videos={this.props.videos}
        />
      )
    }

    return (
      <CardContainer>
        <Card>{videolist}</Card>
        {selectedVideo !== null ? <VideoForm /> : <UploadFile />}
        <Hidden>
          <Debug />
        </Hidden>
      </CardContainer>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  videos: getUploads(state),
  selectedVideo: getVideo(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedVideo: bindActionCreators(setSelectedVideo, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  VideoManagerContainer
)
