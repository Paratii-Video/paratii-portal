import { Map } from 'immutable'

import React, { Component } from 'react'
import styled from 'styled-components'
import { MAX_WIDTH, MEDIAQUERY_BREAKPOINT } from '../constants/UIConstants'
import PTIGuide from 'components/widgets/PTIGuide'
import VideoRecord from 'records/VideoRecords'
import RedeemVoucher from 'containers/RedeemVoucherContainer'
import FileUploader from 'containers/FileUploaderContainer'
import UploadList from 'containers/UploadListContainer'
import { VIDEOMANAGER_FILEUPLOADERWRAPPER_MARGIN } from 'constants/UIConstants'

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

const FileUploaderWrapper = styled.div`
  display: flex;
  flex: 1 1 100%;
  margin: ${({ margin }) =>
    margin ? VIDEOMANAGER_FILEUPLOADERWRAPPER_MARGIN : null};
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

    return this.props.isWalletSecured ? (
      <Wrapper column={showList}>
        {showList && <UploadList />}
        <FileUploaderWrapper margin={showList}>
          <FileUploader showCard={!showList} />
        </FileUploaderWrapper>
        {!showList ? <RedeemVoucher marginLeft /> : ''}
        {!showList && <PTIGuide marginLeft />}
      </Wrapper>
    ) : null
  }
}

export default VideoManager
