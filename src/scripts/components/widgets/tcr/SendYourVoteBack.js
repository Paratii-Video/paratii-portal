/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import SVGIcon from 'components/foundations/SVGIcon'

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

export default class SendYourVoteBack extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <SVGIcon
            icon="icon-alert"
            height="18px"
            width="18px"
            margin="0 10px 0 0"
          />
          You need to send back your vote!!
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            You have previously cast a secret vote, and now is the time to
            reveal it!
          </Text>
        </InfoStatusContent>
        <Button>Reveal your vote</Button>
      </Fragment>
    )
  }
}
