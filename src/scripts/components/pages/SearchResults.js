/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import SearchResult from 'components/widgets/SearchResult'
import Video from 'records/VideoRecords'

const Wrapper = styled.div`
  width: 1180px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.Search.results.background};
`

const Results = styled.div`
  width: 100%;
  flex: 1 0 auto;
  overflow-y: auto;
`

const HasNextLink = styled.button`
  width: 100%;
  flex: 0 0 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.Search.nextButton};
`

type Props = {
  hasNext: boolean,
  results: ImmutableList<Video>,
  searchForMoreVideos: () => Promise<void>
}

class SearchResults extends React.Component<Props, void> {
  renderClickForMore () {
    const { hasNext, searchForMoreVideos } = this.props

    if (!hasNext) {
      return null
    }

    return (
      <HasNextLink onClick={searchForMoreVideos}>
        Click for more results
      </HasNextLink>
    )
  }

  render () {
    return (
      <Wrapper>
        <Results>
          {this.props.results.map((result: Video) => (
            <SearchResult key={result.get('id')} video={result} />
          ))}
        </Results>
        {this.renderClickForMore()}
      </Wrapper>
    )
  }
}

export default SearchResults
