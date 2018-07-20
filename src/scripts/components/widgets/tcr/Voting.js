/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import ProgressBar, {
  ProgressBarContainer
} from 'components/foundations/ProgressBar'

type Props = {}

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const Voting = styled.div`
  display: flex;
  flex-direction: column;
`

const VotingValuesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const VotingValue = styled.div`
  align-content: center;
  background-color: ${props => props.theme.colors.background.secondary};
  display: flex;
  flex: 0 0 48.5%;
  flex-direction: column;
  justify-items: center;
  padding: 24px 14px 14px;
  text-align: center;
`

const VotingBarWrapper = styled(ProgressBarContainer)`
  background: ${props => props.theme.colors.ProfileCuration.VotingBarTwo};
  margin: 20px 0 25px;
`

const VotingBar = styled(ProgressBar)`
  background: ${props => props.theme.colors.ProfileCuration.VotingBarOne};
`

export default class VotingBox extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          Voting
        </InfoStatusTitle>
        <Voting>
          <VotingValuesWrapper>
            <VotingValue>
              <Text textTransform="uppercase" small green>
                Support
              </Text>
              <Title big bold gray>
                65%
              </Title>
            </VotingValue>
            <VotingValue>
              <Text textTransform="uppercase" small pink>
                Oppose
              </Text>
              <Title big bold gray>
                35%
              </Title>
            </VotingValue>
          </VotingValuesWrapper>
          <VotingBarWrapper>
            <VotingBar current="65" total="100" />
          </VotingBarWrapper>
        </Voting>
        <Text small gray>
          Date of the challenge: 04/03/2018
        </Text>
      </Fragment>
    )
  }
}
