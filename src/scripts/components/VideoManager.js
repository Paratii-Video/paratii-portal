import { Map } from 'immutable'

import React, { Component } from 'react'

import { CardContainer } from 'components/structures/Card'
import PTIGuide from 'components/widgets/PTIGuide'
import VideoRecord from 'records/VideoRecords'
import RedeemVoucher from 'containers/RedeemVoucherContainer'
import VideoList from 'containers/VideoListContainer'
import VideoForm from 'containers/VideoFormContainer'
import UploadFile from 'containers/FileUploaderContainer'

import type { Match } from 'react-router-dom'

type Props = {
  match: Match,
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  setSelectedVideo: (id: string) => void,
  showModal: (View: Object) => void,
  closeModal: () => void
}

const Wrapper = CardContainer.extend`
  margin: 0 auto;
  max-width: 1500px;
  width: 100%;

  @media (max-width: 1280px) {
    justify-content: ${props => (props.padding ? 'space-between' : 'center')};
    padding: ${props => (props.padding ? '0 5%' : '0')};
  }
`

class VideoManager extends Component<Props, void> {
  constructor (props: Props) {
    super(props)
    this.props.setSelectedVideo(this.getVideoIdFromRequest())
  }

  componentWillUnmount (): void {
    this.props.setSelectedVideo('')
  }

  getVideoIdFromRequest (): string {
    const params: Object = this.props.match.params
    return params.id || ''
  }

  render () {
    const showForm = this.props.selectedVideo
    const showList = this.props.videos.size > 0 || this.props.selectedVideo
    return (
      <Wrapper padding={!showForm}>
        {showList ? (
          <VideoList
            videoFormRef={this.videoFormRef}
            withFull={showForm}
            marginRight
          />
        ) : (
          ''
        )}
        {showForm ? (
          <VideoForm
            innerRef={(ref: HTMLElement) => {
              this.videoFormRef = ref
            }}
            showModal={this.props.showModal}
            closeModal={this.props.closeModal}
          />
        ) : (
          <UploadFile />
        )}
        {!showList ? <RedeemVoucher marginLeft /> : ''}
        {!showForm && <PTIGuide marginLeft />}
      </Wrapper>
    )
  }
}

export default VideoManager
