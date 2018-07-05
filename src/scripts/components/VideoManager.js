import { Map } from 'immutable'

import React, { Component } from 'react'
import styled from 'styled-components'
import { MAX_WIDTH, MEDIAQUERY_BREAKPOINT } from '../constants/UIConstants'
import PTIGuide from 'components/widgets/PTIGuide'
import VideoRecord from 'records/VideoRecords'
import RedeemVoucher from 'containers/RedeemVoucherContainer'
import FileUploader from 'containers/FileUploaderContainer'
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : null)};
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${MAX_WIDTH};
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
    flex-wrap: wrap;
  }
`

const CardWrapper = styled.div`
  box-sizing: border-box;
  flex: 0 0 ${({ column }) => (column ? '100%' : '32%')};
  margin-bottom: 40px;
  width: ${({ column }) => (column ? '100%' : '32%')};

  @media ${MEDIAQUERY_BREAKPOINT} {
    flex: 0 0 100%;
    width: 100%;
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
    const showList = this.props.videos.size > 0 || this.props.selectedVideo

    return (
      <Wrapper column={showList}>
        {showList && (
          <CardWrapper column={showList}>
            <UploadList />
          </CardWrapper>
        )}
        <CardWrapper column={showList}>
          <FileUploader showCard={!showList} height="100%" />
        </CardWrapper>
        {!showList && (
          <CardWrapper>
            <RedeemVoucher height="100%" />
          </CardWrapper>
        )}
        {!showList && (
          <CardWrapper>
            <PTIGuide height="100%" />
          </CardWrapper>
        )}
      </Wrapper>
    )
  }
}

export default VideoManager
