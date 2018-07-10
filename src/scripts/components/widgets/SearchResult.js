/* @flow */

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Video from 'records/VideoRecords'
import { getVideoThumbnailUrl, getVideoPlayUrl } from 'utils/UrlUtils'
import { formatDuration } from 'utils/VideoUtils'
import TruncatedText from 'components/foundations/TruncatedText'

const LinkWrapper = styled(Link)`
  display: flex;
  width: 100%;
  height: 160px;
  background: ${({ theme }) => theme.colors.Search.results.background};
  align-items: center;
  padding: 10px 20px;

  &:hover {
    background: ${({ theme }) => theme.colors.Search.results.hoverBackground};
  }
`

const THUMBNAIL_WIDTH: string = '260px'

const ThumbnailWrapper = styled.div`
  flex: 0 0 ${THUMBNAIL_WIDTH};
  height: 100%;
  margin-right: 10px;
  position: relative;
`

const ThumbnailImage = styled.img`
  height: 100%;
  width: 100%;
`

const THUMBNAIL_DATA_PADDING = '4px'

const ThumbnailData = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: ${THUMBNAIL_DATA_PADDING};
`

const Duration = styled.div`
  position: absolute;
  bottom: ${THUMBNAIL_DATA_PADDING};
  right: ${THUMBNAIL_DATA_PADDING};
  color: ${({ theme }) => theme.colors.Search.results.duration.text};
  background: ${({ theme }) => theme.colors.Search.results.duration.background};
  padding: 4px;
  font-size: 16px;
  text-align: center;
`

const Info = styled.div`
  flex: 1 1 0;
  max-width: calc(100% - ${THUMBNAIL_WIDTH});
  height: 100%;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.Search.results.border};
`

const TOP_BAR_HEIGHT: string = '25px'

const TopBar = styled.div`
  width: 100%;
  height: ${TOP_BAR_HEIGHT};
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  flex: 0 1 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.Search.results.titleColor};
  font-weight: bold;
  font-size: 18px;
`

const Author = styled.div`
  max-width: 60%;
  color: ${({ theme }) => theme.colors.Search.results.authorColor};
`

const BottomBar = styled.div`
  height: calc(100% - ${TOP_BAR_HEIGHT});
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.Search.results.descriptionColor};
`

const Description = styled.p`
  font-size: 16px;
  max-height: 37.5px;
  overflow: hidden;
  display: block;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
`

type Props = {
  video: Video
}

class SearchResult extends React.Component<Props, void> {
  render () {
    const { video } = this.props
    return (
      <LinkWrapper
        to={getVideoPlayUrl(video)}
        data-test-id="search-result"
        data-test-video-id={video.get('id')}
      >
        <ThumbnailWrapper>
          <ThumbnailImage
            data-test-id="search-result-thumbnail"
            src={getVideoThumbnailUrl(video)}
          />
          <ThumbnailData>
            <Duration data-test-id="search-result-duration">
              {formatDuration(video.get('duration'))}
            </Duration>
          </ThumbnailData>
        </ThumbnailWrapper>
        <Info>
          <TopBar>
            <Title data-test-id="search-result-title">
              <TruncatedText>{video.get('title')}</TruncatedText>
            </Title>
            <Author data-test-id="search-result-author">
              <TruncatedText>{video.get('author')}</TruncatedText>
            </Author>
          </TopBar>
          <BottomBar>
            <Description data-test-id="search-result-description">
              {video.get('description')}
            </Description>
          </BottomBar>
        </Info>
      </LinkWrapper>
    )
  }
}

export default SearchResult
