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

const AlphaBar = () => (
  <Wrapper>
    <Text accent><TranslatedText message="landingPage.alert_html" /></Text>
    <ButtonWrapper>
      <TextButton highlight>
        <SVGIcon
          icon="icon-close"
          width="14px"
          height="14px"
        />
      </TextButton>
    </ButtonWrapper>
  </Wrapper> 
)

export default AlphaBar
