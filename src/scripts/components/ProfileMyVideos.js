import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Title from './foundations/Title'
import Text, { Strong } from './foundations/Text'
import Button from './foundations/Button'
import SVGIcon from './foundations/SVGIcon'
import RadioCheck, { RadioWrapper } from './widgets/forms/RadioCheck'

type Props = {}

const PROFILEPICTURE_SIZE = '112px'
const Z_INDEX_TIME = 2

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

const ProfileMyVideosItem = styled.li`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerInfoBackground};
  position: relative;
`

const ProfileMyVideosItemLink = styled(Link)`
  display: block;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`

const ProfileMyVideosItemMedia = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerImageBackground};
  height: 200px;
  position: relative;
  width: 100%;
`

const ProfileMyVideosItemImage = styled.div`
  background: url(${({ source }) => source}) no-repeat 50%;
  background-size: cover;
  height: 100%;
  width: 100%;
`

// <export or import from Videoform>
const VideoMediaTime = styled.div`
  bottom: 10px;
  padding: 10px;
  position: absolute;
  right: 10px;
  z-index: ${Z_INDEX_TIME};

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
// </export or import from Videoform>

const ProfileMyVideosItemInfo = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerInfoBackground};
  padding: 20px;
`

const ProfileMyVideosItemButtons = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  position: absolute;
  right: 20px;
`

const ProfileMyVideosItemButton = styled(Button)`
  margin-left: 10px;
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
          <ProfileMyVideosItem>
            <ProfileMyVideosItemLink to="/profile">
              <ProfileMyVideosItemMedia>
                <ProfileMyVideosItemImage source="http://www.redbullsignatureseries.com/wp-content/uploads/2017/03/P-20160515-00063_News-720x405.jpg" />

                <VideoMediaTime>
                  <VideoMediaTimeText>00:10:00</VideoMediaTimeText>
                </VideoMediaTime>
              </ProfileMyVideosItemMedia>
              <ProfileMyVideosItemInfo>
                <Text small>
                  Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit
                  amet dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi
                  dolor
                </Text>
                <Text small gray>
                  10 000 views
                </Text>
                <Text small>
                  Status: <Strong purple>Published</Strong>
                </Text>
                <Text small gray>
                  11 months ago
                </Text>
              </ProfileMyVideosItemInfo>
            </ProfileMyVideosItemLink>
            <ProfileMyVideosItemButtons>
              <ProfileMyVideosItemButton>
                <SVGIcon
                  icon="icon-player-share"
                  color="gray"
                  width="24px"
                  height="15px"
                />
              </ProfileMyVideosItemButton>
              <ProfileMyVideosItemButton>
                <SVGIcon
                  icon="icon-settings"
                  color="gray"
                  width="17px"
                  height="17px"
                />
              </ProfileMyVideosItemButton>
            </ProfileMyVideosItemButtons>
          </ProfileMyVideosItem>
          <ProfileMyVideosItem>
            <ProfileMyVideosItemLink to="/profile">
              <ProfileMyVideosItemMedia>
                <ProfileMyVideosItemImage source="http://www.redbullsignatureseries.com/wp-content/uploads/2017/03/P-20160515-00063_News-720x405.jpg" />

                <VideoMediaTime>
                  <VideoMediaTimeText>00:10:00</VideoMediaTimeText>
                </VideoMediaTime>
              </ProfileMyVideosItemMedia>
              <ProfileMyVideosItemInfo>
                <Text small>
                  Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit
                  amet dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi
                  dolor
                </Text>
                <Text small gray>
                  10 000 views
                </Text>
                <Text small>
                  Status: <Strong pink>Challenged</Strong>
                </Text>
                <Text small gray>
                  11 months ago
                </Text>
              </ProfileMyVideosItemInfo>
            </ProfileMyVideosItemLink>
            <ProfileMyVideosItemButtons>
              <ProfileMyVideosItemButton>
                <SVGIcon
                  icon="icon-player-share"
                  color="gray"
                  width="24px"
                  height="15px"
                />
              </ProfileMyVideosItemButton>
              <ProfileMyVideosItemButton>
                <SVGIcon
                  icon="icon-settings"
                  color="gray"
                  width="17px"
                  height="17px"
                />
              </ProfileMyVideosItemButton>
            </ProfileMyVideosItemButtons>
          </ProfileMyVideosItem>
        </ProfileMyVideosList>
      </Wrapper>
    )
  }
}

export default ProfileMyVideos
