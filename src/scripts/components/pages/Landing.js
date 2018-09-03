import React, { Component } from 'react'
import styled from 'styled-components'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'
import {
  BUTTON_HEIGHT,
  LANDING_HEADERWRAPPER_MARGIN_VERTICAL,
  LANDING_HEADERCONTENTITEM_MAX_WIDTH,
  LANDING_HEADERTEXT_MARING,
  LANDING_HEADERBUTTONSITEM_MARGIN,
  LANDING_HEADERBUTTONSITEM_MARGIN_BP,
  LANDING_VIDEOSCONTAINER_MARGIN,
  LANDING_VIDEOSCONTAINER_MAX_WIDTH,
  LANDING_TEXTWRAPPER_MARGIN,
  LANDING_TEXTWRAPPER_MAX_WIDTH,
  LANDING_LISTVIDEOS_MARGIN_BOTTOM,
  LANDING_LISTVIDEOSITEM_HEIGHT,
  LANDING_LISTVIDEOSITEM_HEIGHT_HIGHLIGHT,
  LANDING_LISTVIDEOSITEM_HEIGHT_BP,
  LANDING_LISTVIDEOSITEM_HEIGHT_HIGHLIGHT_BP,
  VIDEOTIMEDISPLAY_POSITION,
  MAINHEADER_PADDING_LEFT,
  MAINHEADER_PADDING_LEFT_BP,
  MEDIAQUERY_BREAKPOINT,
  Z_INDEX_FRONT,
  Z_INDEX_BACK
} from 'constants/UIConstants'
import {
  LANDING_HEADER_VIDEOS,
  LANDING_HIGHLIGHT_VIDEOS,
  LANDING_CATEGORY_VIDEOS
} from 'constants/LandingConstants'

import { Link } from 'react-router-dom'
import { FlexCenterStyle, AbsoluteFullStyle } from '../foundations/Styles'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import Button from '../foundations/Button'
import TextButton from '../foundations/TextButton'
import VideoTimeDisplay from '../foundations/VideoTimeDisplay'
import SVGIcon from '../foundations/SVGIcon'
import TranslatedText from '../translations/TranslatedText'

type Props = {
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  ${FlexCenterStyle}
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  box-shadow: ${props => props.theme.colors.LandingPage.secondary};
  flex-direction: column;
  padding: 0 ${MAINHEADER_PADDING_LEFT};

  @media ${MEDIAQUERY_BREAKPOINT} {
    background-image: url(${props => props.backgroundMobile});
    padding: 0 ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const HeaderWrapper = styled.div`
  margin: ${LANDING_HEADERWRAPPER_MARGIN_VERTICAL} 0;
  width: 100%;

  @media (max-width: 767px) {
    margin: 20px 0;
  }
`

const HeaderContent = styled.div`
  width: 100%;
`

const HeaderContentItem = styled.div`
  max-width: ${LANDING_HEADERCONTENTITEM_MAX_WIDTH};
  width: 100%;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`

const HeaderTitle = Title.extend`
  font-size: ${props => props.theme.fonts.title.huge};
  line-height: ${props => props.theme.fonts.title.hugeLineHeight};

  @media (max-width: 500px) {
    font-size: ${props => props.theme.fonts.title.big};
    line-height: ${props => props.theme.fonts.title.bigLineHeight};
  }
`

const HeaderText = Text.extend`
  margin: ${LANDING_HEADERTEXT_MARING};
  opacity: 0.7;
`

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
`

const HeaderButtonsItem = styled.div`
  color: ${props => props.theme.colors.text.accent};
  display: flex;
  align-items: center;
  margin: ${LANDING_HEADERBUTTONSITEM_MARGIN};
  min-height: ${BUTTON_HEIGHT};
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`

const HeaderButton = Button.withComponent(Link)

const Videos = styled.div`
  display: block;
  padding: 0 ${MAINHEADER_PADDING_LEFT};

  @media ${MEDIAQUERY_BREAKPOINT} {
    padding: 0 ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const VideosContainer = styled.div`
  margin: ${LANDING_VIDEOSCONTAINER_MARGIN};
  max-width: ${LANDING_VIDEOSCONTAINER_MAX_WIDTH};
  width: 100%;
`

const TextWrapper = styled.div`
  margin: ${LANDING_TEXTWRAPPER_MARGIN};
  max-width: ${LANDING_TEXTWRAPPER_MAX_WIDTH};
  text-align: center;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`

const ListVideos = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ nomargin }) => nomargin ? null : LANDING_LISTVIDEOS_MARGIN_BOTTOM};
`

const ListVideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  overflow: hidden;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ListVideosItem = styled.div`
  height: ${({ highlight }) => highlight ? LANDING_LISTVIDEOSITEM_HEIGHT_HIGHLIGHT : LANDING_LISTVIDEOSITEM_HEIGHT};

  @media (max-width: 767px) {
    display: none;
    height: ${({ highlight }) => highlight ? LANDING_LISTVIDEOSITEM_HEIGHT_HIGHLIGHT_BP : LANDING_LISTVIDEOSITEM_HEIGHT_BP};
  }

  &:nth-child(1),
  &:nth-child(2) {
    @media (max-width: 767px) {
      display: block;
    }
  }
`

const ListVideosItemLink = styled(Link)`
  display: block;
  height: 100%;
  overflow: hidden;
  position: relative;
`

const ListVideosItemBackground = styled.span`
  ${AbsoluteFullStyle}
  background: ${props => props.theme.colors.background.primary}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  transition: transform 5s ${({ theme }) => theme.animation.ease.outexpo} 0.1s;
  z-index: ${Z_INDEX_BACK};
  ${ListVideosItemLink}:hover & {
    transform: scale(1.1);
    transition-delay: 0s;
    transition-timing-function: ${({ theme }) =>
    theme.animation.ease.easeinexpo};
    transition-duration: 3s;
  }
`

const ListVideosItemShadow = styled.div`
  ${AbsoluteFullStyle}
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  opacity: 1;
  transition: opacity 1s;
  z-index: ${Z_INDEX_BACK};
  ${ListVideosItemLink}:hover & {
    opacity: 0.8;
  }
`

const ListVideosItemContainer = styled.div`
  height: 100%;
  position: relative;
  z-index: ${Z_INDEX_FRONT};
`

const ListVideosItemTitle = Text.extend`
  display: block;
  position:absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  overflow: hidden;
  padding: ${VIDEOTIMEDISPLAY_POSITION};
  text-overflow:ellipsis; 
  white-space: nowrap;
  width: 100%;
`

const ListVideosItemIcon = styled.div`
  color: ${props => props.theme.colors.text.accent};
  height: 20px;
  left: 50%;
  margin: -10px 0 0 -10px;
  position: absolute;
  top: 50%;
  width: 20px;
  transform: scale(0);
  transition: transform 0.45s ${({ theme }) => theme.animation.ease.smooth};
  ${ListVideosItemLink}:hover & {
    transform: scale(1);
  }
`

const ListVideosButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ListVideoButton = TextButton.withComponent(Link)

class Landing extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Header
          background={'/assets/img/landing/big/around-the-block.png'}
          backgroundMobile={'/assets/img/landing/big/around-the-block-mobile.png'}
        >
          <HeaderWrapper>
            <HeaderContent>
              <HeaderContentItem>
                <HeaderTitle bold accent>
                  <TranslatedText message="landingPage.header.title_html" />
                </HeaderTitle>
                <HeaderText big primary>
                  <TranslatedText message="landingPage.header.description_html" />
                </HeaderText>
                <HeaderButtons>
                  {LANDING_HEADER_VIDEOS.map((item, index) => {
                    if (item.url) {
                      return (
                        <HeaderButtonsItem key={index}>
                          <HeaderButton iconbutton="true" to={item.url}>
                            <SVGIcon
                              icon="icon-player-play"
                              width="14px"
                              height="14px"
                              margin="0 10px 0 0"
                            />
                            <TranslatedText message="landingPage.header.button" /> {item.title}
                          </HeaderButton>
                        </HeaderButtonsItem>
                      )
                    } else {
                      return (
                        <HeaderButtonsItem key={index}>
                          <SVGIcon
                            icon="icon-lock"
                            width="14px"
                            height="14px"
                            margin="0 10px 0 0"
                          />
                          <Text accent small>
                            <TranslatedText message="landingPage.header.button" /> {item.title}
                          </Text>
                        </HeaderButtonsItem>
                      )
                    }
                  })}
                </HeaderButtons>
              </HeaderContentItem>
            </HeaderContent>
          </HeaderWrapper>
        </Header>
        <Videos>
          <VideosContainer>
            {LANDING_HIGHLIGHT_VIDEOS.map((item, index) => {
              return (
                <ListVideos nomargin key={index}>
                  <Title accent small margin="0 0 15px">Explore more crypto content</Title>
                  <ListVideosContainer>
                    {item.list.map((item2, index2) => {
                      return (
                        <ListVideosItem highlight key={index2}>
                          <ListVideosItemLink to={item2.url}>
                            <ListVideosItemBackground background={'/assets/img/landing/small/' + item2.image} />
                            <ListVideosItemContainer>
                              <ListVideosItemIcon>
                                <SVGIcon icon="icon-player-play" />
                              </ListVideosItemIcon>
                            </ListVideosItemContainer>
                          </ListVideosItemLink>
                        </ListVideosItem>
                      )
                    })}
                  </ListVideosContainer>
                  <ListVideosButtonWrapper><ListVideoButton to={item.slug} margin="20px 0 0"><TranslatedText message="landingPage.button" /></ListVideoButton></ListVideosButtonWrapper>
                </ListVideos>
              )
            })}
            <TextWrapper>
              <Text big><TranslatedText message="landingPage.text" /></Text>
            </TextWrapper>
            {LANDING_CATEGORY_VIDEOS.map((item, index) => {
              return (
                <ListVideos key={index}>
                  <Title accent small margin="0 0 15px">{item.title}</Title>
                  <ListVideosContainer>
                    {item.list.map((item2, index2) => {
                      return (
                        <ListVideosItem key={index2}>
                          <ListVideosItemLink to={item2.url}>
                            <ListVideosItemBackground background={'/assets/img/landing/small/' + item2.image} />
                            <ListVideosItemShadow />
                            <ListVideosItemContainer>
                              <ListVideosItemTitle bold accent>
                                {item2.title}
                              </ListVideosItemTitle>
                              <VideoTimeDisplay>{item2.time}</VideoTimeDisplay>
                              <ListVideosItemIcon>
                                <SVGIcon icon="icon-player-play" />
                              </ListVideosItemIcon>
                            </ListVideosItemContainer>
                          </ListVideosItemLink>
                        </ListVideosItem>
                      )
                    })}
                  </ListVideosContainer>
                  <ListVideosButtonWrapper><ListVideoButton to={item.slug} margin="20px 0 0"><TranslatedText message="landingPage.button" /></ListVideoButton></ListVideosButtonWrapper>
                </ListVideos>
              )
            })}
          </VideosContainer>
        </Videos>
      </Wrapper>
    )
  }
}

export default Landing
