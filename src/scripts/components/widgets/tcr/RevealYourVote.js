/* @flow */
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Text from 'components/foundations/Text'
import SVGIcon from 'components/foundations/SVGIcon'
import TranslatedText from 'components/translations/TranslatedText'

type Props = {
  videoId: string,
  tcrStatusRecord: Object,
  notification: (Object, string) => void,
  revealYourVote: (pollID: string, videoId: string) => void
}

const InfoStatusTitle = styled(Text)`
  display: flex;
  align-items: center;
`

const InfoStatusContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin};
`

export default class RevealYourVote extends Component<Props, void> {
  revealYourVote: () => void

  async revealYourVote () {
    console.log(this.props.tcrStatusRecord)
    const pollID = this.props.tcrStatusRecord.data.challenge.id
    try {
      return this.props.revealYourVote(pollID, this.props.videoId)
    } catch (e) {
      this.props.notification(
        {
          title: 'Error',
          message: e.message
        },
        'error'
      )
    }
  }

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
          <TranslatedText message="tcr.RevealYourVote.title" />
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            <TranslatedText message="tcr.RevealYourVote.text" />
          </Text>
        </InfoStatusContent>
        <Button
          data-test-id="RevealYourVote.button"
          onClick={() => this.revealYourVote()}
        >
          <TranslatedText message="tcr.RevealYourVote.button" />
        </Button>
      </Fragment>
    )
  }
}
