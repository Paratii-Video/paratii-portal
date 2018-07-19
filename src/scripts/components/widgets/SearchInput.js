import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { StyleFieldText } from 'components/foundations/forms/Input'
import { ButtonStyleHover } from 'components/foundations/Button'
import SVGIcon from 'components/foundations/SVGIcon'
import {
  BORDER_RADIUS,
  INPUT_HEIGHT,
  SEARCHINPUTBUTTON_WIDTH,
  SEARCHINPUTBUTTON_HEIGHT,
  SEARCHINPUTBUTTON_MARGIN,
  SEARCHINPUTFIELD_PADDING
} from 'constants/UIConstants'
import { SEARCH_PATH } from 'constants/UrlConstants'
import RawTranslatedText from 'utils/translations/RawTranslatedText'

import type { RouterHistory } from 'react-router-dom'

type Props = {
  currentSearchText: string,
  history: RouterHistory,
  onSearchInputChange: (value: string) => void,
  search: (value: string) => void,
  onSearchSubmit: () => void
}

const SearchInputForm = styled.form`
  align-items: center;
  background-color: ${props => props.theme.colors.background.body};
  border-radius: ${BORDER_RADIUS};
  display: inline-flex;
  flex-direction: row-reverse;
  width: 100%;
`

const SearchInputField = styled.input`
  ${StyleFieldText} height: ${INPUT_HEIGHT};
  padding: ${SEARCHINPUTFIELD_PADDING};
`

const SearchInputButton = styled.button`
  ${ButtonStyleHover};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 0 0 ${SEARCHINPUTBUTTON_WIDTH};
  height: ${SEARCHINPUTBUTTON_HEIGHT};
  margin: ${SEARCHINPUTBUTTON_MARGIN};
`

class SearchInput extends Component<Props, void> {
  onSubmitForm = (e: Object): void => {
    const { history, onSearchSubmit } = this.props
    const { currentSearchText, search } = this.props

    e.preventDefault()

    history.push(SEARCH_PATH)

    search({ keyword: currentSearchText })
    onSearchSubmit()
  }

  render () {
    const { currentSearchText, onSearchInputChange } = this.props

    return (
      <SearchInputForm
        data-test-id="search-nav-form"
        onSubmit={this.onSubmitForm}
      >
        <SearchInputField
          data-test-id="search-nav-input"
          onChange={(e: Object) => {
            onSearchInputChange({ value: e.target.value })
          }}
          placeholder={RawTranslatedText({
            message: 'search.input.placeholder'
          })}
          value={currentSearchText}
        />
        <SearchInputButton>
          <SVGIcon color="gray" icon="icon-search" />
        </SearchInputButton>
      </SearchInputForm>
    )
  }
}

SearchInput.defaultProps = {
  onSearchSubmit: () => {}
}

export default withRouter(SearchInput)
