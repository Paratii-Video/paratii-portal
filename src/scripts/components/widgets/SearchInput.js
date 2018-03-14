import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'

type Props = {}

const SearchInputForm = styled.form`
  align-items: center;
  display: inline-flex;
  flex-direction: row-reverse;
  width: 100%;
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

const SearchInputButton = styled(Button)`
  flex-basis: ${props => props.theme.sizes.searchInputButton};
  height: ${props => props.theme.sizes.searchInputButton};
  margin-right: 10px;
`

const SearchInputSVG = styled.svg`
  fill: ${props => props.theme.colors.header.icon};
  height: 100%;
  width: 100%;
`

class SearchInput extends Component<Props, void> {
  render () {
    return (
      <SearchInputForm>
        <SearchInputField placeholder="Search" />

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
