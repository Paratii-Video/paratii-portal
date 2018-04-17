import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'

type Props = {
  currentSearchText: string,
  onSearchInputChange: (e: Object) => void
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

const SearchInputSVG = styled.svg`
  fill: ${props => props.theme.colors.header.icon};
  height: 100%;
  width: 100%;
`

class SearchInput extends Component<Props, void> {
  render () {
    const { currentSearchText, onSearchInputChange } = this.props

    return (
      <SearchInputForm>
        <SearchInputField
          onChange={(e: Object) => {
            onSearchInputChange({ value: e.target.value })
          }}
          placeholder="Search"
          value={currentSearchText}
        />
        <SearchInputButton>
          <SearchInputSVG>
            <use xlinkHref="#icon-search" />
          </SearchInputSVG>
        </SearchInputButton>
      </SearchInputForm>
    )
  }
}

export default SearchInput
