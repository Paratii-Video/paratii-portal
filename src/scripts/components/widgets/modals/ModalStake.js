/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import UserRecord from 'records/UserRecords'

type Props = {
  videoId: Object,
  user: UserRecord,
  modalProps: Object,
  closeModal: () => void,
  saveVideoInfo: Object => Object,
  selectedVideo: Object => Object
}

const Wrapper = styled.div`
  color: ${props => props.theme.colors.Modal.color};
  width: 100%;
`

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
`

const Anchor = Button.withComponent('a')

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

class ModalStake extends Component<Props, Object> {
  onSubmit: (e: Object) => void
  constructor (props: Props) {
    super(props)
    const selectedVideo = this.props.selectedVideo
    this.state = {
      id: selectedVideo.id,
      title: selectedVideo.title,
      description: selectedVideo.description,
      // FIXME: we are not editing duration, so we do not need to store it in the state
      duration: selectedVideo.duration,
      author: selectedVideo.author,
      errorMessage: false,
      agreedTOC: false // TODO,
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (event: Object) {
    event.preventDefault()

    paratii.eth.tcr
      .checkEligiblityAndApply(
        this.props.videoId.id.toString(),
        paratii.eth.web3.utils.toWei(5 + '')
      )
      .then(resp => {
        if (resp && resp === true) {
          this.setState({
            errorMessage: false
          })
          const videoToSave = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            author: this.state.author,
            published: true
          }
          this.props.saveVideoInfo(videoToSave)
          this.props.closeModal()
          console.log(
            `video ${this.props.videoId.id.toString()} successfully applied to TCR Listing`
          )
        } else {
          const msg =
            'apply returns false :( , something went wrong at contract level. check balance, gas, all of that stuff.'
          this.setState({
            errorMessage: msg
          })
          console.log(msg)
        }
      })
      .catch(e => {
        if (e) {
          const msg = String(e)
          this.setState({
            errorMessage: msg
          })
          console.log(msg)
        }
      })
  }

  render () {
    const balance = this.props.user.balances.PTI
    // FIXME: format this better
    const balanceInPTI = Number(balance) / 10 ** 18
    const minDeposit = 5
    const balanceIsTooLow = Number(balance) < minDeposit * 10 ** 18
    return (
      <Wrapper>
        <Title>Stake {minDeposit} PTI</Title>
        <Highlight>
          By publishing this video you agree to make a stake deposit of{' '}
          {minDeposit} PTI. The tokens still belong to you, and can be
          retrieved, along with the video, any time.
        </Highlight>
        {!balanceIsTooLow ? (
          <MainText small>
            For now, with no monetary value, this is mostly an experiment. Soon,
            the community will curate all the content published. Well-received
            videos will see their stakes increase, earning PTI for their
            creators. Illegal content may lose its stake. Want to know how
            exactly this is going to play out? Stay alert!
          </MainText>
        ) : (
          ''
        )}

        {this.state.errorMessage && (
          <MainText pink small>
            {this.state.errorMessage}
          </MainText>
        )}
        {balanceIsTooLow ? (
          <MainText pink>
            Your balance is too low: you need to stake at least {minDeposit}{' '}
            PTI, but you only have {balanceInPTI}. Have no voucher?{' '}
            <Anchor
              href="mailto:we@paratii.video"
              target="_blank"
              purple
              anchor
            >
              Drop us a line
            </Anchor>{' '}
            and we might hand out some. Remember: these are testnet tokens. No
            real value (yet)!
          </MainText>
        ) : (
          <Footer>
            <Button purple onClick={this.onSubmit}>
              Continue
            </Button>
          </Footer>
        )}
      </Wrapper>
    )
  }
}

export default ModalStake
