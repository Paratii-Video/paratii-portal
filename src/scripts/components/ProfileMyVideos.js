import React, { Component } from 'react'
import styled from 'styled-components'
import Text, { Strong } from './foundations/Text'

type Props = {}

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
`

const ProfileHeaderInfo = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerInfoBackground};
  margin-top: 210px;
  padding: 20px;
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
`

const ProfileMyVideosItemMedia = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerImageBackground};
  height: 200px;
`

const ProfileMyVideosItemInfo = styled.div`
  background: ${props =>
    props.theme.colors.ProfileMyVideos.headerInfoBackground};
  padding: 20px;
`

class ProfileMyVideos extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <ProfileHeader>
          <ProfileHeaderInfo />
        </ProfileHeader>
        <ProfileMyVideosList>
          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>

          <ProfileMyVideosItem>
            <ProfileMyVideosItemMedia />
            <ProfileMyVideosItemInfo>
              <Text small>
                Lorem ipsum dolor sit amet, dipiscing elit. Lorem ipsum sit amet
                dipi dolor, dipiscing elit. Lorem ipsum sit amet dipi dolor
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
          </ProfileMyVideosItem>
        </ProfileMyVideosList>
      </Wrapper>
    )
  }
}

export default ProfileMyVideos
