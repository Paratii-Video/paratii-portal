import { Map } from 'immutable'

import React, { Component } from 'react'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'
import Loader from 'components/foundations/Loader'
import VideoForm from 'containers/VideoFormContainer'

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
  flex-direction: ${props => (props.column ? 'initial' : 'column')};
  margin: 0 auto;
  max-width: 1080px;
  width: 100%;

  @media (max-width: 1280px) {
    justify-content: ${props => (props.padding ? 'space-between' : 'center')};
  }
`

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 400px;
  align-items: center;
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
    const selectedVideo = this.props.selectedVideo

    console.log('selectedVideo', selectedVideo)
    return (
      <Wrapper>
        {this.props.isWalletSecured && selectedVideo ? (
          <VideoForm
            key={selectedVideo.id}
            videoId={selectedVideo.id}
            video={selectedVideo}
          />
        ) : (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </Wrapper>
    )
  }
}

export default VideoManager
