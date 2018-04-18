/* @flow */

import React from 'react'
import styled from 'styled-components'

import Video from 'records/VideoRecords'
import { getVideoThumbnailUrl } from 'utils/UrlUtils'

const Wrapper = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  background: white;
  align-items: center;
  padding: 10px 20px;
`

const ThumbnailWrapper = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
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
  flex: 1 1 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  flex: 0 0 auto;
  display: flex;
`

const Title = styled.div`
  flex: 0 0 auto;
`

const BottomBar = styled.div`
  flex: 1 1 0;
  display: flex;
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
            <Title>{video.get('title')}</Title>
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
