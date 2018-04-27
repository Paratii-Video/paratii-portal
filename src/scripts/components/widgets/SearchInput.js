import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import Button from 'components/foundations/Button'
import SVGIcon from 'components/foundations/SVGIcon'
import { SEARCH_PATH } from 'constants/UrlConstants'

import type { RouterHistory } from 'react-router-dom'

type Props = {
  currentSearchText: string,
  history: RouterHistory,
  onSearchInputChange: (value: string) => void,
  search: (value: string) => void
}

const SearchInputForm = styled.form`
  align-items: center;
  display: inline-flex;
  flex-direction: row-reverse;
  width: 100%;
  background-color: ${props => props.theme.colors.Nav.search.background};
`

const SearchInputField = styled.input`
  background-color: transparent;
  color: ${props => props.theme.colors.TextField.color};
  font-size: 14px;
  height: ${props => props.theme.sizes.mainInput.height};
  padding-left: 7px;
  padding-right: 7px;
  width: 100%;
`

const SEARCH_BUTTON_DIMENSION: string = '27px'

const SearchInputButton = styled(Button)`
  flex: 0 0 ${SEARCH_BUTTON_DIMENSION};
  height: ${SEARCH_BUTTON_DIMENSION};
  padding-left: 10px;
  margin-right: 10px;
`

class SearchInput extends Component<Props, void> {
  onSubmitForm = (e: Object): void => {
    const { history } = this.props
    const { currentSearchText, search } = this.props

    e.preventDefault()

    history.push(SEARCH_PATH)

    search({ keyword: currentSearchText })
  }

  render () {
    const { currentSearchText, onSearchInputChange } = this.props

    return (
      <SearchInputForm onSubmit={this.onSubmitForm}>
        <SearchInputField
          onChange={(e: Object) => {
            onSearchInputChange({ value: e.target.value })
          }}
          placeholder="Search"
          value={currentSearchText}
        />
        <SearchInputButton>
          <SVGIcon icon="icon-search" />
        </SearchInputButton>
      </SearchInputForm>
    )
  }
}

export default withRouter(SearchInput)
