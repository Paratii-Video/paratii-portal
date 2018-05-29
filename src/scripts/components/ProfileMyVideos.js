import React, { Component } from 'react'
import styled from 'styled-components'
import type { VideoRecord } from 'records/VideoRecords'
import Title from './foundations/Title'
import RadioCheck, { RadioWrapper } from './widgets/forms/RadioCheck'
import MyVideoItem from '../containers/MyVideoItemContainer'

type Props = {
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const PROFILEPICTURE_SIZE = '112px'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1285px;
  width: 100%;
`

const ProfileHeader = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerImageBackground};
  display: flex;
  flex-direction: column;
`
const ProfileHeaderCover = styled.div`
  background: url(${({ source }) => source}) no-repeat 50%;
  background-size: cover;
  height: 210px;
`

const ProfileHeaderInfo = styled.div`
  align-items: center;
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerInfoBackground};
  display: flex;
  flex-direction: column;
  padding: 0 42px 24px;
`

const ProfileHeaderPicture = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.ProfilePictureBackground}
    url(${({ source }) => source}) no-repeat 50%;
  background-size: cover;
  border: 8px solid
    ${props => props.theme.colors.ProfileMyVideos.ProfilePictureBackground};
  border-radius: 100%;
  height: ${PROFILEPICTURE_SIZE};
  transform: translate3d(0, -50%, 0);
  width: ${PROFILEPICTURE_SIZE};
`

const ProfileHeaderInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const ProfileFilterVideos = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.ProfileMyVideos.filterBackground};
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  padding: 30px 48px;
`

const ProfileFilterTitle = styled(Title)`
  flex: 1 1 100%;
`

const ProfileFilterRadioWrapper = styled(RadioWrapper)`
  flex-wrap: nowrap;
  width: auto;
`

const ProfileMyVideosList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-top: 24px;
`

class ProfileMyVideos extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <ProfileHeader>
          <ProfileHeaderCover source="http://www.redbullsignatureseries.com/wp-content/uploads/2017/03/P-20160515-00063_News-720x405.jpg" />
          <ProfileHeaderInfo>
            <ProfileHeaderPicture source="http://www.redbullsignatureseries.com/wp-content/uploads/2017/03/P-20160515-00063_News-720x405.jpg" />
            <ProfileHeaderInfoWrapper>
              <Title bold>User 12610549</Title>
            </ProfileHeaderInfoWrapper>
          </ProfileHeaderInfo>
        </ProfileHeader>
        <ProfileFilterVideos>
          <ProfileFilterTitle small>My videos</ProfileFilterTitle>
          <ProfileFilterRadioWrapper>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="published"
              disabled={false}
              checkbox
            >
              Published
            </RadioCheck>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="challenged"
              disabled={false}
              checkbox
            >
              Challenged
            </RadioCheck>
            <RadioCheck
              name="myvideos-published"
              margin="0 20px 0 0"
              value="voting,"
              disabled={false}
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
