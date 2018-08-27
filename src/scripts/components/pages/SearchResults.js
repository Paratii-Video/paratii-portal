/* @flow */

import React, { Fragment } from 'react'
import styled from 'styled-components'
import { List as ImmutableList } from 'immutable'

import { FlexCenterStyle } from '../foundations/Styles'
import Loader from 'components/foundations/Loader'
import Title from 'components/foundations/Title'
import Text from 'components/foundations/Text'
import TextButton from 'components/foundations/TextButton'
import SearchResult from 'components/widgets/SearchResult'
import TranslatedText from 'components/translations/TranslatedText'
import Video from 'records/VideoRecords'
import { VIDEO_CATEGORIES } from 'constants/CategoriesConstants'
import Card from 'components/structures/Card'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  width: 1180px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 400px;
  align-items: center;
`

const HasNextButton = styled.button`
  ${FlexCenterStyle} width: 100%;
  flex: 0 0 60px;
  padding-top: 10px;
  padding-bottom: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const RelatedContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 40px;
`

const RelatedContentItem = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`

const CategoryButton = TextButton.withComponent(Link)

type Props = {
  hasNext: boolean,
  results: ImmutableList<Video>,
  searchForMoreVideos: () => Promise<void>,
  searchTerm: string,
  resultsLoading: boolean
}

class SearchResults extends React.Component<Props, void> {
  renderClickForMore () {
    const { hasNext, searchForMoreVideos } = this.props

    if (!hasNext) {
      return null
    }

    return (
      <HasNextButton
        data-test-id="more-results-button"
        onClick={searchForMoreVideos}
      >
        <TranslatedText message="search.results.moreResults" />
      </HasNextButton>
    )
  }

  relatedContent () {
    const { searchTerm } = this.props
    const contentRelated = VIDEO_CATEGORIES.filter(item => item.tags.indexOf(searchTerm) > -1)

    return (
      (contentRelated.length > 0) &&
        (<RelatedContent>
          <Title small accent><TranslatedText message="search.results.relatedContent" /></Title>
          <RelatedContentItem>
            <Text primary margin="0 10px 0 0"><TranslatedText message="search.results.relatedContentCategories" /></Text>
            {contentRelated.map((item, index) => {
              return (
                <CategoryButton
                  key={index}
                  to={item.slug}
                  margin="0 10px 0 0"
                  accent="true"
                >{item.name}</CategoryButton >
              )
            })}
          </RelatedContentItem>
        </RelatedContent>)
    )
  }

  renderSearchTerm () {
    const { searchTerm } = this.props

    return (
      <Title accent margin="0 0 20px">
        <TranslatedText
          message="search.results.resultsFor"
          options={{ term: searchTerm }}
        />
      </Title>
    )
  }

  renderSearchResultsSection () {
    if (this.props.searchTerm) {
      if (!this.props.results.size) {
        return (
          <Fragment>
            {this.relatedContent()}
            <Title accent data-test-id="no-results-zero-state">
              <TranslatedText
                message="search.results.noResultsFor"
                options={{ term: this.props.searchTerm }}
              />
            </Title>
          </Fragment>
        )
      }

      return (
        <Fragment>
          {this.relatedContent()}
          {this.renderSearchTerm()}
          {this.props.results.map((result: Video) => (
            <SearchResult key={result.get('id')} video={result} />
          ))}
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Text big accent data-test-id="enter-keywords-zero-state"><TranslatedText message="search.results.zeroState" /></Text>
      </Fragment>
    )
  }

  render () {
    return (
      <Wrapper data-test-id="search-results">
        <Card>
          {this.props.resultsLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            this.renderSearchResultsSection()
          )}
        </Card>
        {this.renderClickForMore()}
      </Wrapper>
    )
  }
}

export default SearchResults
