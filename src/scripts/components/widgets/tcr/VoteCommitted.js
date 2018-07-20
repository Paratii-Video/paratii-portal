/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text, { Strong } from 'components/foundations/Text'
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

export default class VoteCommitted extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <SVGIcon
            icon="icon-check"
            height="18px"
            width="18px"
            margin="0 10px 0 0"
          />
          Vote committed
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 0">
          <Text>
            Wait until the commit period ends to reveal it. You will send it{' '}
            <Strong purple>back</Strong> when the reveal period starts. If you
            don’t send it back your vote is not going to be counted.
          </Text>
        </InfoStatusContent>
      </Fragment>
    )
  }
}
