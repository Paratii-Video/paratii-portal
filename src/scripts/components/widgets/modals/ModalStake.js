/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import UserRecord from 'records/UserRecords'
import { ModalContentWrapper, ModalScrollContent } from './Modal'

type Props = {
  id: string,
  title: string,
  description: string,
  author: string,
  user: UserRecord,
  closeModal: () => void,
  saveVideoStaked: Object => Object,
  selectedVideo: Object => Object,
  notification: (Object, string) => void,
  loadBalances: () => void
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

class ModalStake extends Component<Props, Object> {
  onSubmit: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      errorMessage: false,
      agreedTOC: false, // TODO,
      stakeAmount: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (event: Object) {
    const { loadBalances } = this.props
    event.preventDefault()
    this.props.notification({ title: 'Processing...' }, 'warning')
    // const stakeAmountBN = await paratii.eth.tcr.getMinDeposit()
    const stakeAmount = this.state.stakeAmount
    console.log(stakeAmount)
    const stakeAmountWei = paratii.eth.web3.utils.toWei(stakeAmount.toString())
    const videoIdStaked = this.props.selectedVideo.id

    paratii.eth.tcrPlaceholder
      .checkEligiblityAndApply(videoIdStaked, stakeAmountWei)
      .then(resp => {
        if (resp && resp === true) {
          this.setState({
            errorMessage: false
          })
          const videoToSave = {
            id: videoIdStaked,
            deposit: stakeAmountWei
          }
          this.props.saveVideoStaked(videoToSave)

          this.props.closeModal()
          console.log(
            `video ${videoIdStaked} successfully applied to TCR Listing`
          )
          this.props.notification(
            {
              title: 'Stake well done',
              message: `You have staked ${stakeAmount} PTI.`
            },
            'success'
          )
          loadBalances()
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

  async componentDidMount () {
    const stakeAmountBN = await paratii.eth.tcr.getMinDeposit()
    const stakeAmount = stakeAmountBN.toString()
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
    const balanceIsTooLow = balanceInPTI < minDeposit
    return (
      <ModalContentWrapper>
        <ModalScrollContent>
          <Title>Stake {minDeposit} PTI</Title>
          <Highlight>
            By publishing this video you agree to make a stake deposit of{' '}
            {minDeposit} PTI. The tokens still belong to you, and can be
            retrieved, along with the video, at any time.
          </Highlight>
          {!balanceIsTooLow ? (
            <MainText small gray>
              For now, with no monetary value, this is mostly an experiment.
              Soon, the community will curate all the content published.
              Well-received videos will see their stakes increase, earning PTI
              for their creators. Illegal content may lose its stake. Want to
              know how exactly this is going to play out? Stay alert!
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
                href="mailto:we@player.paratii.video"
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
                data-test-id="button-stake"
              >
                Continue
              </Button>
            </Footer>
          )}
        </ModalScrollContent>
      </ModalContentWrapper>
    )
  }
}

export default ModalStake
