/* @flow */

import React from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import SearchResult from 'components/widgets/SearchResult'
import Video from 'records/VideoRecords'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: blue;
`

type Props = {
  results: ImmutableList<Video>
}

class SearchResults extends React.Component<Props, void> {
  render () {
    return (
      <Wrapper>
        {this.props.results.map((result: Video) => (
          <SearchResult key={result.get('id')} video={result} />
        ))}
      </Wrapper>
    )
  }
}

export default SearchResults
