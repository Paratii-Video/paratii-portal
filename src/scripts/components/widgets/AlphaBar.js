/* @flow */

import React from 'react'
import styled from 'styled-components'
import { FlexCenterStyle } from '../foundations/Styles'
import Text from '../foundations/Text'
import TextButton from '../foundations/TextButton'
import TranslatedText from '../translations/TranslatedText'
import SVGIcon from '../foundations/SVGIcon'
import {
  Z_INDEX_ALPHABAR,
  ALPHABAR_PADDING_VERTICAL,
  MAINHEADER_PADDING_LEFT,
  MAINHEADER_PADDING_LEFT_BP,
  MEDIAQUERY_BREAKPOINT

} from 'constants/UIConstants'

const Wrapper = styled.div`
  ${FlexCenterStyle}
  background: ${props => props.theme.colors.text.highlight};
  padding: ${ALPHABAR_PADDING_VERTICAL} ${MAINHEADER_PADDING_LEFT};
  text-align: center;
  width: 100%;

  @media ${MEDIAQUERY_BREAKPOINT} {
    padding: ${ALPHABAR_PADDING_VERTICAL} ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const ButtonWrapper = styled.div`
  justify-self: flex-end;
  right: ${MAINHEADER_PADDING_LEFT};

  @media ${MEDIAQUERY_BREAKPOINT} {
    right: ${MAINHEADER_PADDING_LEFT_BP};
  }
`

class AlphaBar extends React.Component<Props> {
  closeBar: () => void
  constructor (props: Props) {
    super(props)

    const showBar = localStorage.getItem('ParatiiAlphaBar')

    this.state = {
      disabled: showBar === 'true'
    }

    this.closeBar = this.closeBar.bind(this)
  }

  closeBar (): void {
    localStorage.setItem('ParatiiAlphaBar', 'true')
    this.setState({ disabled: true })
  }

  render () {
    const { disabled } = this.state
    return (
      !disabled && (
        <Wrapper>
          <Text accent><TranslatedText message="landingPage.alert_html" /></Text>
          <ButtonWrapper>
            <TextButton
              highlight
              onClick={this.closeBar}
            >
              <SVGIcon
                icon="icon-close"
                width="14px"
                height="14px"
              />
            </TextButton>
          </ButtonWrapper>
        </Wrapper>
      )
    )
  }
}

export default AlphaBar
