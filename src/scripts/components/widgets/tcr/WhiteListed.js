/* @flow */
import React, { Component, Fragment } from 'react'
// import paratii from 'utils/ParatiiLib'
import styled from 'styled-components'
import Button from 'components/foundations/Button'
import Text, { Strong } from 'components/foundations/Text'
import { MODAL } from 'constants/ModalConstants'

type Props = {
  videoId: string,
  isWalletSecured: boolean,
  openModal: string => void,
  checkUserWallet: () => void
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

class WhiteListed extends Component<Props, void> {
  challengeVideo: number => void

  constructor (props: Props) {
    super(props)

    this.challengeVideo = this.challengeVideo.bind(this)
  }

  challengeVideo () {
    if (this.props.isWalletSecured) {
      this.props.openModal(MODAL.CHALLENGE)
    } else {
      // If wallet not secure open the modal for signup / login
      this.props.checkUserWallet()
    }
  }

  render () {
    return (
      <Fragment>
        <InfoStatusTitle big accent>
          This video is <Strong accent>Whitelisted</Strong>
        </InfoStatusTitle>
        <InfoStatusContent margin="36px 0 30px">
          <Text>
            This video has been published in our network. If it has anything
            that goes against our policy challenge it and you may be rewarded
          </Text>
        </InfoStatusContent>
        <Button onClick={this.challengeVideo}>Challenge this content</Button>
      </Fragment>
    )
  }
}

export default WhiteListed
