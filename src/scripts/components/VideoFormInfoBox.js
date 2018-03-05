/* @flow */

import React, { Component } from 'react'
import { List as ImmutableList } from 'immutable'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import VideoRecord from 'records/VideoRecords'
import Card from './structures/Card'
import TextField from './widgets/forms/TextField'
import VideoProgress from 'components/widgets/VideoForm/VideoProgress'
import Hidden from 'components/foundations/Hidden'

const VideoFormInfoBox = styled.div`
  flex: 1 1 584px;
  padding-bottom: 70px;
  position: relative;

  @media (max-width: 1150px) {
    flex: 1 1 100%;
  }
`
const VideoMedia = styled.div`
  margin-bottom: 15px;
  position: relative;
  width: 100%;
`

const VideoImage = styled.div`
  display: block;
  width: 100%;
  padding-top: 60%;
  background-color: black;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center center;
`

const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;

  &::before {
    background-color: ${props =>
    props.theme.colors.VideoForm.info.time.background};
    border-radius: 2px;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

const VideoMediaTimeText = styled.p`
  color: ${props => props.theme.colors.VideoForm.info.time.color};
  font-size: ${props => props.theme.fonts.video.info.time};
  position: relative;
  z-index: 1;
`
const PublishLabel = styled.div`
  color: ${props => props.theme.colors.button.gray};
  font-size: ${props => props.theme.fonts.text.tiny};
  position: absolute;
  bottom: 0;
  z-index: 1;
`

type Props = {
  selectedVideo: VideoRecord,
  progress: Number,
  getTotalProgress: () => Number
}

class InfoBox extends Component<Props, Object> {
  render () {
    const video: VideoRecord = this.props.selectedVideo
    if (!this.props.selectedVideo.id) {
      return (
        <Card title="No video selected!">{this.props.selectedVideo.id}</Card>
      )
    }

    const duration = (video && video.get('duration')) || ''
    let durationBox = null
    if (duration) {
      durationBox = (
        <VideoMediaTime>
          <VideoMediaTimeText>{duration}</VideoMediaTimeText>
        </VideoMediaTime>
      )
    }

    // const fileSize = prettyBytes((video && video.get('filesize')) || 0)
    const ipfsHash = (video && video.get('ipfsHash')) || ''
    const urlToPlay = `/play/${video.id}`
    const urlForSharing = `https://portal.paratii.video/play/${video.id}`

    const thumbImages: ImmutableList<string> =
      (video && video.getIn(['thumbnails'])) || ImmutableList()

    let thumbImage = 'https://paratii.video/public/images/paratii-src.png'
    if (thumbImages && ipfsHash) {
      const firstThumb = thumbImages.get(0)
      if (firstThumb !== undefined) {
        thumbImage = `https://gateway.paratii.video/ipfs/${ipfsHash}/${firstThumb}`
      }
    }

    // FIXME: use the selector for the status
    // const progress = this.props.getTotalProgress()
    const uploadProgress = video.uploadStatus.data.progress
    const transcodingStatus = video.transcodingStatus.data.progress
    const progress = Math.floor((uploadProgress + transcodingStatus) / 2)

    const isPublished = video.published === true || video.published === 'true'
    const isPublishable =
      video.transcodingStatus.name === 'success' && isPublished === false

    const transcoderMessages = {
      idle: 'Waiting',
      requested: 'Waiting for transcoding to start...',
      running: 'Transcoding...',
      failed: 'Transcoder exited with an error :-('
    }
    const uploaderMessages = {
      idle: 'Waiting for upload',
      requested: 'Starting upload',
      running: 'Uploading...',
      'uploaded to local node': 'Uploading...',
      'uploaded to remote': 'Still uploading',
      success: 'Uploading done, now waiting for transcoder...'
    }
    let statusMessage
    if (video.uploadStatus.data.progress === 100) {
      statusMessage =
        '2/2 - ' +
        (transcoderMessages[video.transcodingStatus.get('name')] ||
          video.transcodingStatus.name)
    } else {
      statusMessage =
        '1/2 - ' +
        (uploaderMessages[video.getIn(['uploadStatus', 'name'])] ||
          video.getIn(['uploadStatus', 'name']))
    }

    return (
      <VideoFormInfoBox>
        <VideoMedia>
          <Link to={urlToPlay}>
            <VideoImage data-src={thumbImage} src={thumbImage} />
          </Link>
          {durationBox}
        </VideoMedia>
        <VideoProgress progress={progress + '%'} marginBottom marginTop>
          {statusMessage}
        </VideoProgress>
        <Hidden>
          <TextField
            id="video-title"
            type="text"
            margin="0 0 30px"
            onChange={e => this.handleInputChange('title', e)}
            value="<iframe width=560 height=315 src=https://"
            label="Embed Code"
            readonly
          />
        </Hidden>
        <TextField
          id="video-title"
          type="text"
          margin="0 0 25px"
          onChange={e => this.handleInputChange('title', e)}
          value={urlForSharing}
          label="Share this video"
          readonly
        />
        {!isPublishable && !isPublished ? (
          <PublishLabel>
            You can publish this video as soon as it is <strong>ready</strong>
          </PublishLabel>
        ) : (
          ''
        )}
      </VideoFormInfoBox>
    )
  }
}

export default InfoBox
