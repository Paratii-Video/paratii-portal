/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import SVGIcon from 'components/foundations/SVGIcon'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {}

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin};
`

export default class VideoRejected extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <SVGIcon
            icon="icon-close"
            height="18px"
            width="18px"
            margin="0 10px 0 0"
          />
          <TranslatedText message="tcr.VideoRejected.title" />
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            <TranslatedText message="tcr.VideoRejected.text" />
          </Text>
        </InfoStatusContent>
      </Fragment>
    )
  }
}
