/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import ProgressBar, {
  ProgressBarContainer
} from 'components/foundations/ProgressBar'
import TranslatedText from 'components/translations/TranslatedText'

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
  background: linear-gradient(
    to top,
    ${props => props.theme.colors.button.highlightFrom} 0%,
    ${props => props.theme.colors.button.highlightTo} 100%
  );
  margin: 20px 0 25px;
`

const VotingBar = styled(ProgressBar)`
  background: linear-gradient(
    to top,
    ${props => props.theme.colors.button.accentFrom} 0%,
    ${props => props.theme.colors.button.accentTo} 100%
  );
`

export default class VotingBox extends Component<Props, void> {
  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <TranslatedText message="tcr.Voting.title" />
        </InfoStatusTitle>
        <Voting>
          <VotingValuesWrapper>
            <VotingValue>
              <Text textTransform="uppercase" small green>
                <TranslatedText message="tcr.Voting.box1Label" />
              </Text>
              <Title big bold gray>
                65%
              </Title>
            </VotingValue>
            <VotingValue>
              <Text textTransform="uppercase" small pink>
                <TranslatedText message="tcr.Voting.box2Label" />
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
          <TranslatedText message="tcr.Voting.dateLabel" />
        </Text>
      </Fragment>
    )
  }
}
