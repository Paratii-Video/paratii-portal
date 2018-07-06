import React, { Component } from 'react'
import styled from 'styled-components'
import type { VideoRecord } from 'records/VideoRecords'
import Title from './foundations/Title'
import MyVideoItem, { MyVideosWrapper } from './MyVideoItem'
import FileUploader from '../containers/FileUploaderContainer'
import TranslatedText from './translations/TranslatedText'

type Props = {
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1285px;
  width: 100%;
`

const ProfileFilterVideos = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.background.primary};
  display: flex;
  justify-content: space-between;
  padding: 30px 48px;
`

const ProfileFilterTitle = styled(Title)`
  flex: 1 1 100%;
`

const ProfileMyVideosList = MyVideosWrapper.extend`
  margin-top: 24px;
`

const FileUploaderWrapper = styled.li`
  display: block;
  height: 100%;
  min-height: 297px;
`

class ProfileMyVideos extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <ProfileFilterVideos>
          <ProfileFilterTitle small accent>
            <TranslatedText message="myVideos.title" />
          </ProfileFilterTitle>
        </ProfileFilterVideos>
        <ProfileMyVideosList>
          {this.props.videos
            .entrySeq()
            .map(([videoId, videoInfo]) => (
              <MyVideoItem key={videoId} videoId={videoId} video={videoInfo} />
            ))}
          {!this.props.videos && (
            <FileUploaderWrapper>
              <FileUploader />
            </FileUploaderWrapper>
          )}
        </ProfileMyVideosList>
      </Wrapper>
    )
  }
}

export default ProfileMyVideos
