import React, { Component } from 'react'
import styled from 'styled-components'
import type { VideoRecord } from 'records/VideoRecords'
import Title from './foundations/Title'
import RadioCheck, { RadioWrapper } from './widgets/forms/RadioCheck'
import MyVideoItem, { MyVideosWrapper } from './MyVideoItem'
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
  background: ${props => props.theme.colors.ProfileMyVideos.filterBackground};
  display: flex;
  justify-content: space-between;
  padding: 30px 48px;
`

const ProfileFilterTitle = styled(Title)`
  flex: 1 1 100%;
`

const ProfileFilterRadioWrapper = styled(RadioWrapper)`
  flex-wrap: nowrap;
  width: auto;
`

const ProfileMyVideosList = MyVideosWrapper.extend`
  margin-top: 24px;
`

class ProfileMyVideos extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <ProfileFilterVideos>
          <ProfileFilterTitle small>
            <TranslatedText message="MyVideos.title" />
          </ProfileFilterTitle>
          <ProfileFilterRadioWrapper>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="published"
              disabled={true}
              defaultChecked
              checkbox
            >
              Published
            </RadioCheck>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="challenged"
              disabled={true}
              defaultChecked
              checkbox
            >
              Challenged
            </RadioCheck>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="voting,"
              disabled={true}
              defaultChecked
              checkbox
              nomargin
            >
              On voting
            </RadioCheck>
          </ProfileFilterRadioWrapper>
        </ProfileFilterVideos>
        <ProfileMyVideosList>
          {this.props.videos
            .entrySeq()
            .map(([videoId, videoInfo]) => (
              <MyVideoItem key={videoId} videoId={videoId} video={videoInfo} />
            ))}
        </ProfileMyVideosList>
      </Wrapper>
    )
  }
}

export default ProfileMyVideos
