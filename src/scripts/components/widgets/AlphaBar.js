/* @flow */

import React from 'react'
import styled from 'styled-components'
import { FlexCenterStyle } from '../foundations/Styles'
import Text from '../foundations/Text'
import TextButton from '../foundations/TextButton'
import TranslatedText from '../translations/TranslatedText'
import SVGIcon from '../foundations/SVGIcon'
import {
  ALPHABAR_PADDING_VERTICAL,
  MAINHEADER_PADDING_LEFT,
  MAINHEADER_PADDING_LEFT_BP,
  MEDIAQUERY_BREAKPOINT

} from 'constants/UIConstants'

type Props = {}
type State = {
  disabled: boolean
}

const Wrapper = styled.div`
  ${FlexCenterStyle}
  background: ${props => props.theme.colors.text.highlight};
  width: 100%;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  padding: ${ALPHABAR_PADDING_VERTICAL} ${MAINHEADER_PADDING_LEFT};
  text-align: center;

  @media ${MEDIAQUERY_BREAKPOINT} {
    flex-direction: column;
    padding: ${ALPHABAR_PADDING_VERTICAL} ${MAINHEADER_PADDING_LEFT_BP};
  }
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10px;

  @media ${MEDIAQUERY_BREAKPOINT} {
    right: 10px;
  }
`

class AlphaBar extends React.Component<Props, State> {
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
          <Container>
            <Text
              accent
              margin="10px"
            >
              <SVGIcon
                icon="icon-alpha"
                width="20px"
                height="20px"
              />
            </Text>
            <Text
              accent
              margin="10px 0"
            ><TranslatedText message="landingPage.alert_html" /></Text>
          </Container>
          <ButtonWrapper>
            <TextButton
              highlight
              onClick={this.closeBar}
            >
              <SVGIcon
                icon="icon-close"
                width="16px"
                height="16px"
              />
            </TextButton>
          </ButtonWrapper>
        </Wrapper>
      )
    )
  }
}

export default AlphaBar
