/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text, { Strong } from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import UserRecord from 'records/UserRecords'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  id: string,
  title: string,
  description: string,
  author: string,
  user: UserRecord,
  selectedVideoId: string,
  closeModal: () => void,
  notification: (Object, string) => void,
  videoChallenged: Object => void
}

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

class ModalChallenge extends Component<Props, Object> {
  onSubmit: (e: Object) => void
  disableButton: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      errorMessage: false,
      agreedTOC: false, // TODO, (????)
      stakeAmount: 0, // ???
      isChallenging: false
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }

  disableButton = () => {
    return this.state.isChallenging
  }

  async onSubmit (event: Object) {
    event.preventDefault()
    this.props.notification({ title: 'Processing the challenge...' }, 'warning')
    this.setState({
      isChallenging: true
    })
    try {
      const tx = await paratii.eth.tcr.approveAndStartChallenge(
        this.props.selectedVideoId
      )
      console.log(tx)
      this.props.videoChallenged({
        id: this.props.selectedVideoId,
        challenger: paratii.getAccount()
      })
      this.props.notification({ title: 'Challenge is ready..' }, 'warning')
      this.props.closeModal()
    } catch (e) {
      this.props.notification({ title: e.message }, 'error')
      console.log(e.message)
    }
  }

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcr.getMinDeposit()
    const stakeAmountWei = stakeAmountBN.toString()
    const stakeAmount = paratii.eth.web3.utils.fromWei(stakeAmountWei)
    this.setState({
      stakeAmount
    })
  }

  componentWillReceiveProps (nextProps: Props): void {
    this.setState({
      errorMessage: false,
      agreedTOC: false // TODO,
    })
  }

  render () {
    const balanceInWei = this.props.user.balances.PTI
    const balanceInPTI = paratii.eth.web3.utils.fromWei(String(balanceInWei))
    const minDeposit = this.state.stakeAmount
    const balanceIsTooLow = Number(balanceInPTI) < Number(minDeposit)
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Challenge this video</Title>
          <Highlight>
            By challenging this video you agree to make a stake deposit of{' '}
            <Strong purple>{minDeposit} PTI</Strong>. This will trigger the{' '}
            <strong>voting period</strong>.
          </Highlight>
          {!balanceIsTooLow ? (
            <MainText small gray>
              For now, PTI has no monetary value, and this is mostly an
              experiment. Soon, the community will curate all the published
              content . Well-received videos will see their stakes increase,
              earning PTI for their creators. Illegal content may lose its
              stake. Want to know how exactly this is going to play out? Stay
              alert!
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
              Your balance is too low: to challenge this video you need at least{' '}
              {minDeposit} PTI, but you only have {balanceInPTI}. Have no
              voucher?{' '}
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
              <Button
                purple
                onClick={this.onSubmit}
                disabled={this.disableButton()}
                data-test-id="modal-button-challenge"
              >
                Challenge
              </Button>
            </Footer>
          )}
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalChallenge
