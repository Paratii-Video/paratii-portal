import React, { Component } from 'react'
import styled from 'styled-components'
import type { Map } from 'immutable'
import type VideoRecord from 'records/VideoRecords'
import {
  LANDING_VIDEOSCONTAINER_MAX_WIDTH,
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
  VIDEO_CATEGORIES
} from 'constants/CategoriesConstants'

import { Link } from 'react-router-dom'
import { AbsoluteFullStyle } from '../foundations/Styles'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import VideoTimeDisplay from '../foundations/VideoTimeDisplay'
import SVGIcon from '../foundations/SVGIcon'

type Props = {
  location: Object,
  videos: Map<string, VideoRecord> // maps video ids to upload records
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Videos = styled.div`
  display: block;
  padding: 0 ${MAINHEADER_PADDING_LEFT};

  @media ${MEDIAQUERY_BREAKPOINT} {
    padding: 0 ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const VideosContainer = styled.div`
  margin: 0 auto;
  max-width: ${LANDING_VIDEOSCONTAINER_MAX_WIDTH};
  width: 100%;
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

class Landing extends Component<Props, void> {
  render () {
    const { pathname } = this.props.location

    return (
      <Wrapper>
        <Videos>
          <VideosContainer>
            {VIDEO_CATEGORIES.map((item, index) => {
              if (item.slug === pathname) {
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
                  </ListVideos>
                )
              }
            })}
          </VideosContainer>
        </Videos>
      </Wrapper>
    )
  }
}

export default Landing
