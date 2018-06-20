import { Map } from 'immutable'

import React, { Component } from 'react'

import { CardContainer } from 'components/structures/Card'
import PTIGuide from 'components/widgets/PTIGuide'
import VideoRecord from 'records/VideoRecords'
import RedeemVoucher from 'containers/RedeemVoucherContainer'
import UploadFile from 'containers/FileUploaderContainer'
import UploadList from 'containers/UploadListContainer'

import type { Match, History } from 'react-router-dom'

type Props = {
  checkUserWallet: () => void,
  match: Match,
  history: History,
  fetchVideos: () => void,
  videos: Map<string, VideoRecord>,
  selectedVideo: ?VideoRecord,
  isWalletSecured: boolean,
  setSelectedVideo: (id: string) => void,
  showModal: (View: Object) => void,
  closeModal: () => void
}

const Wrapper = CardContainer.extend`
  flex-direction: ${props => (props.column ? 'initial' : 'column')};
  margin: 0 auto;
  max-width: 1080px;
  width: 100%;

  @media (max-width: 1280px) {
    justify-content: ${props => (props.padding ? 'space-between' : 'center')};
  }
`

class VideoManager extends Component<Props, void> {
  constructor (props: Props) {
    super(props)

    this.props.setSelectedVideo(this.getVideoIdFromUrl())
    this.props.fetchVideos()
  }

  componentDidMount (): void {
    if (!this.props.isWalletSecured) {
      this.props.checkUserWallet({
        onClose: () => {
          this.props.history.replace('/')
        }
      })
    }
  }

  componentWillUnmount (): void {
    this.props.setSelectedVideo('')
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (
      nextProps.videos !== this.props.videos ||
      this.getVideoIdFromUrl(nextProps) !== this.getVideoIdFromUrl(this.props)
    ) {
      this.props.setSelectedVideo(this.getVideoIdFromUrl())
    }

    if (nextProps.isWalletSecured && !this.props.isWalletSecured) {
      this.props.fetchVideos()
    }
  }

  getVideoIdFromUrl (props: Props = this.props): string {
    const params: Object = this.props.match.params
    return params.id || ''
  }

  render () {
    const showForm = this.props.selectedVideo
    const showList = this.props.videos.size > 0 || this.props.selectedVideo
    return (
      <Wrapper padding={!showForm} column={!showList}>
        {showList && <UploadList />}
        <UploadFile showCard={!showList} />
        {!showList ? <RedeemVoucher marginLeft /> : ''}
        {!showList && <PTIGuide marginLeft />}
      </Wrapper>
    )
  }
}

export default VideoManager
