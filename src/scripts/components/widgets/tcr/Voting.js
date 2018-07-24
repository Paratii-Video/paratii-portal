/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import ProgressBar, {
  ProgressBarContainer
} from 'components/foundations/ProgressBar'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {
  date: string,
  votesFor: number,
  votesAgainst: number
}

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
  margin: 30px 0 0;
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
  votesFor (against) {
    const total = this.props.votesAgainst + this.props.votesFor
    const percentageFor = Math.round(this.props.votesFor / total * 100) || 0
    const percentageAgainst =
      Math.round(this.props.votesAgainst / total * 100) || 0

    return against ? percentageFor : percentageAgainst
  }

  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          <TranslatedText message="tcr.Voting.title" />
        </InfoStatusTitle>
        <Voting>
          <VotingValuesWrapper>
            <VotingValue>
              <Text textTransform="uppercase" small succeed>
                <TranslatedText message="tcr.Voting.box1Label" />
              </Text>
              <Title big bold gray>
                {this.votesFor()}%
              </Title>
            </VotingValue>
            <VotingValue>
              <Text textTransform="uppercase" small warn>
                <TranslatedText message="tcr.Voting.box2Label" />
              </Text>
              <Title big bold gray>
                {this.votesFor(true)}%
              </Title>
            </VotingValue>
          </VotingValuesWrapper>
          <VotingBarWrapper>
            <VotingBar current={this.votesFor()} total="100" />
          </VotingBarWrapper>
        </Voting>
        <Text small gray>
          <TranslatedText message="tcr.Voting.dateLabel" /> {this.props.date}
        </Text>
      </Fragment>
    )
  }
}
