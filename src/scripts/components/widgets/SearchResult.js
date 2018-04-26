/* @flow */

import React from 'react'
import styled from 'styled-components'

import Video from 'records/VideoRecords'
import { getVideoThumbnailUrl, getVideoPlayUrl } from 'utils/UrlUtils'
import { formatDuration } from 'utils/VideoUtils'
import TruncatedText from 'components/foundations/TruncatedText'

const Wrapper = styled.a`
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
  font-size: 10px;
  text-align: center;
`

const Info = styled.div`
  flex: 1 1 0;
  max-width: calc(100% - ${THUMBNAIL_WIDTH});
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.Search.results.border};
`

const TopBar = styled.div`
  width: 100%;
  flex: 0 0 auto;
  display: flex;
`

const Title = styled.div`
  flex: 0 1 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.Search.results.titleColor};
  font-weight: bold;
  font-size: 18px;
`

const BottomBar = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.Search.results.descriptionColor};
`

const Description = styled.p`
  display: block;
  font-size: 16px;
  max-height: 100%;
  overflow-y: auto;
`

type Props = {
  video: Video
}

class SearchResult extends React.Component<Props, void> {
  render () {
    const { video } = this.props
    return (
      <Wrapper href={getVideoPlayUrl(video)}>
        <ThumbnailWrapper>
          <ThumbnailImage src={getVideoThumbnailUrl(video)} />
          <ThumbnailData>
            <Duration>{formatDuration(video.get('duration'))}</Duration>
          </ThumbnailData>
        </ThumbnailWrapper>
        <Info>
          <TopBar>
            <Title>
              <TruncatedText>{video.get('title')}</TruncatedText>
            </Title>
          </TopBar>
          <BottomBar>
            <Description>{video.get('description')}</Description>
          </BottomBar>
        </Info>
      </Wrapper>
    )
  }
}

export default SearchResult
