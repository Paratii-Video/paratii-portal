/* @flow */

import React from 'react'
import styled from 'styled-components'

import Video from 'records/VideoRecords'
import { getVideoThumbnailUrl } from 'utils/UrlUtils'
import TruncatedText from 'components/foundations/TruncatedText'

const Wrapper = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  background: ${({ theme }) => theme.colors.Search.results.background};
  align-items: center;
  padding: 10px 20px;
`

const ThumbnailWrapper = styled.div`
  flex: 1 0 0;
  height: 100%;
  margin-right: 10px;
  position: relative;
`

const ThumbnailImage = styled.img`
  height: 100%;
  width: 100%;
`

const ThumbnailData = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Info = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
`

const BottomBar = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.Search.results.descriptionColor};
`

const Description = styled.p``

type Props = {
  video: Video
}

class SearchResult extends React.Component<Props, void> {
  render () {
    const { video } = this.props
    return (
      <Wrapper>
        <ThumbnailWrapper>
          <ThumbnailImage src={getVideoThumbnailUrl(video)} />
          <ThumbnailData />
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
