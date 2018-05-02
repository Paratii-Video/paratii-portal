/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import Loader from 'components/foundations/Loader'
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

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 400px;
  align-items: center;
`

const HasNextLink = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 60px;
  padding: 10px 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.Search.nextButton};
`

type Props = {
  hasNext: boolean,
  results: ImmutableList<Video>,
  searchForMoreVideos: () => Promise<void>,
  resultsLoading: boolean
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
          {this.props.resultsLoading ? (
            <LoaderWrapper>
              <Loader height="50px" width="50px" />
            </LoaderWrapper>
          ) : (
            this.props.results.map((result: Video) => (
              <SearchResult key={result.get('id')} video={result} />
            ))
          )}
        </Results>
        {this.renderClickForMore()}
      </Wrapper>
    )
  }
}

export default SearchResults
