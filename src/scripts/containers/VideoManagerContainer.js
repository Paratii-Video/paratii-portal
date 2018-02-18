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

import { CardContainer } from 'components/structures/Card'
import PTIGuide from 'components/widgets/PTIGuide'
import RedeemVoucher from 'components/widgets/RedeemVoucher'

type Props = {
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  setSelectedVideo: Object => void
}

class VideoManagerContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    props.setSelectedVideo(null)
    // this.onVideoListItemClicked = this.onVideoListItemClicked.bind(this)
  }

  // onVideoListItemClicked (id: string) {
  //   this.props.setSelectedVideo(id)
  // }
  //
  render () {
    const selectedVideo =
      this.props.selectedVideo && this.props.selectedVideo.id

    let ConditionalVideoList
    if (this.props.videos.size > 0) {
      ConditionalVideoList = <VideoList />
    }
    //   videoList = (
    //     <Card
    //       margin="0 25px 0 0"
    //       nopadding
    //       footer={
    //         <Button onClick={() => this.onVideoListItemClicked(null)}>
    //           Add more videos
    //         </Button>
    //       }
    //     >
    //       <VideoList
    //         onItemClick={this.onVideoListItemClicked}
    //         videos={this.props.videos}
    //       />
    //     </Card>
    //   )
    // }

    return (
      <CardContainer>
        {ConditionalVideoList}
        {selectedVideo ? <VideoForm /> : <UploadFile />}
        <RedeemVoucher margin="0 25px" />
        {!selectedVideo && <PTIGuide />}
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
