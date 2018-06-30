import React, { Component } from 'react'
import styled from 'styled-components'
import Title from '../../foundations/Title'

type Props = {
  srcProfileImage: String,
  srcCoverImage: String,
  username: String
}

const PROFILEPICTURE_SIZE = '112px'

const Wrapper = styled.div`
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

class ProfileHeader extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <ProfileHeaderCover source={this.props.srcCoverImage} />
        <ProfileHeaderInfo>
          <ProfileHeaderPicture source={this.props.srcProfileImage} />
          <ProfileHeaderInfoWrapper>
            <Title bold>{this.props.username}</Title>
          </ProfileHeaderInfoWrapper>
        </ProfileHeaderInfo>
      </Wrapper>
    )
  }
}

export default ProfileHeader
