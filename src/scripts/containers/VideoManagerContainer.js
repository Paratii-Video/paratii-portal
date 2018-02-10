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
import UploadFile from './UploadFileContainer'

import Card, { CardContainer } from 'components/structures/Card'
import Button from 'components/foundations/buttons/Button'

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
        <Card
          margin="0 25px 0 0"
          nopadding
          footer={
            <Button onClick={() => this.onVideoListItemClicked(null)}>
              Add more videos
            </Button>
          }
        >
          {videolist}
        </Card>
        {selectedVideo !== null ? <VideoForm /> : <UploadFile />}
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
