/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text, { TextColor } from 'components/foundations/Text'
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

const Icon = styled.span`
  ${TextColor} display: inline;
`

export default class VideoApproved extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <Icon succeed>
            <SVGIcon
              icon="icon-check"
              height="18px"
              width="18px"
              margin="0 10px 0 0"
            />
          </Icon>
          <TranslatedText message="tcr.VideoApproved.title" />
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            <TranslatedText message="tcr.VideoApproved.text" />
          </Text>
        </InfoStatusContent>
      </Fragment>
    )
  }
}
