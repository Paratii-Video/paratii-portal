/* @flow */
import paratii from 'utils/ParatiiLib'
import React, { Component } from 'react'
import styled from 'styled-components'
import TextField from './forms/TextField'
import TextButton from '../foundations/TextButton'
import Text from '../foundations/Text'
import Card from '../structures/Card'

type Props = {
  isWalletSecured: boolean,
  height: boolean,
  openModal: string => void,
  loadBalances: () => void,
  notification: (Object, string) => void,
  checkUserWallet: () => void
}

const Icon = styled.svg`
  display: block;
  height: 140px;
  margin: 0 auto 45px;
  width: 100%;
`

const Wrapper = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SubmitButton = styled(TextButton)`
  margin: 30px 0 0;
`

const Anchor = TextButton.withComponent('a')

const FooterWrapper = styled.div`
  padding-bottom: 15px;
  padding-top: 17px;
`

class RedeemVoucher extends Component<Props, Object> {
  redeemVoucher: (e: Object) => void
  handleChange: (e: Object) => void
  handleFocus: (e: Object) => void

  constructor (props: Props) {
    super(props)
    this.state = {
      error: '',
      voucher: '',
      disableInput: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.redeemVoucher = this.redeemVoucher.bind(this)
  }

  handleChange (event: Object) {
    // If wallet not secure open the modal
    if (this.props.isWalletSecured) {
      this.setState({ voucher: event.target.value })
    } else {
      this.props.checkUserWallet()
    }
  }

  handleFocus (event: Object) {
    console.log('fouxus')
    // If wallet not secure open the modal
    if (!this.props.isWalletSecured) {
      this.props.checkUserWallet()
    }
  }

  redeemVoucher (event: Object) {
    const { loadBalances } = this.props
    event.preventDefault()
    this.setState({ disableInput: true, error: '' })
    this.props.notification({ title: 'Reading' }, 'warning')
    const voucherCode = this.state.voucher
    paratii.eth.vouchers
      .redeem(voucherCode)
      .then(resp => {
        if (resp) {
          loadBalances()
          const amount = paratii.eth.web3.utils.fromWei(String(resp))
          this.props.notification(
            { title: 'Success', message: `You have received ${amount} PTI.` },
            'success'
          )
          this.setState({
            disableInput: false,
            voucher: ''
          })
        } else {
          this.props.notification(
            { title: 'Ops!', message: `Something went wrong` },
            'error'
          )
        }
      })
      .catch(error => {
        if (error) {
          this.props.notification(
            { title: 'Oh, no!', message: error.message, autoDismiss: 10 },
            'error'
          )
          this.setState({
            disableInput: false,
            error: error.message,
            voucher: voucherCode
          })
        }
      })
  }

  render () {
    return (
      <Card
        {...this.props}
        title="Redeem your voucher"
        height={this.props.height}
        footer={
          <FooterWrapper>
            <Text small>
              Have no voucher?{' '}
              <Anchor
                href="mailto:we@paratii.video"
                target="_blank"
                anchor
                accent
              >
                Drop us a line
              </Anchor>{' '}
              and we might hand out some. Remember: these are testnet tokens. No
              real value (yet)!
            </Text>
          </FooterWrapper>
        }
      >
        <Icon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-79 1956.301 157.1 163.379"
        >
          <defs>
            <linearGradient
              id="a"
              x2="1.001"
              y1=".5"
              y2=".5"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#904cef" />
              <stop offset="1" stopColor="#7d70ff" />
            </linearGradient>
          </defs>
          <g>
            <path
              fill="#2F3057"
              d="M-47.144 2001.697H67.209a10.923 10.923 0 0 1 10.891 10.891v96.2a10.923 10.923 0 0 1-10.891 10.891H-47.144a10.923 10.923 0 0 1-10.891-10.889v-96.2a10.923 10.923 0 0 1 10.891-10.893z"
              data-name="Path 357"
            />
            <path
              fill="url(#a)"
              d="M144.666 32.852H82.044v-2.541c15.519-.182 29.677-4.719 36.847-7.442a5.305 5.305 0 0 0 3.267-3.267 5.707 5.707 0 0 0-.182-4.719l-5.807-11.708A5.457 5.457 0 0 0 110.814 0C89.849 1.269 81.863 15.518 80.32 18.694H67.614C65.98 15.518 57.994 1.269 37.029 0a5.6 5.6 0 0 0-5.355 3.176l-5.808 11.616a5.707 5.707 0 0 0-.182 4.719 5.533 5.533 0 0 0 3.267 3.267C36.121 25.5 50.37 30.039 65.8 30.22v2.541H3.176A3.216 3.216 0 0 0 0 35.938v19.24a3.216 3.216 0 0 0 3.176 3.176h6.172v86.128a3.216 3.216 0 0 0 3.176 3.176h122.7a3.216 3.216 0 0 0 3.176-3.176V58.446h6.171a3.216 3.216 0 0 0 3.176-3.176V36.029a3.028 3.028 0 0 0-3.081-3.177zM110.9 2.176a3.589 3.589 0 0 1 3.358 2l5.808 11.617a3.81 3.81 0 0 1 .182 2.995 3.4 3.4 0 0 1-2.087 2.087c-7.079 2.723-20.965 7.17-36.121 7.351v-3.088c1.906-1.452 11.254-8.35 22.508-8.8a1.027 1.027 0 0 0 1-1.089.979.979 0 0 0-1.089-1c-10.346.454-18.877 5.718-22.417 8.35v-2.634c.728-1.543 7.807-16.518 28.858-17.789zM29.677 20.782a3.4 3.4 0 0 1-2.087-2.087 3.482 3.482 0 0 1 .182-2.995L33.58 4.173a3.59 3.59 0 0 1 3.358-2C58.266 3.447 65.073 18.331 65.8 19.965v2.36c-3.54-2.541-12.071-7.805-22.417-8.35a.979.979 0 0 0-1.089 1 1.09 1.09 0 0 0 1 1.089c11.254.545 20.6 7.351 22.508 8.8v3.267c-15.16-.27-29.046-4.718-36.125-7.349zm38.3.091h11.889v11.98H67.977zM66.888 34.94H89.3v21.327H58.538V34.94zM2.178 55.269v-19.24a1.1 1.1 0 0 1 1.089-1.089h53.184v21.327H3.176a.952.952 0 0 1-.998-.998zm9.348 89.3V58.446h49.553v87.217H12.615a1.1 1.1 0 0 1-1.089-1.089zm51.731 1.089V58.446h21.328v87.217zm73.059-1.089a1.1 1.1 0 0 1-1.089 1.089H86.763V58.446h49.553zm9.348-89.3a1.1 1.1 0 0 1-1.089 1.089H91.392V34.94h53.183a1.1 1.1 0 0 1 1.089 1.089zm-91.845 82.044a1.1 1.1 0 0 1-1.089 1.087H19.876a1.1 1.1 0 0 1-1.089-1.089v-4.719a1.1 1.1 0 0 1 1.089-1.089 1.049 1.049 0 0 1 1.089 1.089v3.63H52.82a1.03 1.03 0 0 1 .999 1.091zm40.205 0a1.1 1.1 0 0 1 1.089-1.089h31.856v-3.63a1.1 1.1 0 0 1 1.089-1.089 1.049 1.049 0 0 1 1.089 1.089v4.719a1.1 1.1 0 0 1-1.089 1.089H95.113a1.1 1.1 0 0 1-1.089-1.089zM10.437 49.1a1.1 1.1 0 0 1-1.089-1.089v-4.722a1.1 1.1 0 0 1 1.089-1.089 1.049 1.049 0 0 1 1.089 1.089v3.63h3.63a1.1 1.1 0 0 1 1.089 1.089 1.049 1.049 0 0 1-1.089 1.092zM138.4 43.289v4.719a1.1 1.1 0 0 1-1.089 1.089H132.6a1.1 1.1 0 0 1-1.089-1.089 1.049 1.049 0 0 1 1.089-1.089h3.63v-3.63a1.1 1.1 0 0 1 1.089-1.089 1.049 1.049 0 0 1 1.081 1.089z"
              data-name="Path 358"
              transform="translate(-79 1956.32)"
            />
          </g>
        </Icon>
        <Wrapper>
          <TextField
            error={this.state.error.length > 0}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            label="Enter code here to receive test PTI"
            disabled={this.state.disableInput}
            value={this.state.voucher}
            id="voucher-code"
            name="voucher-code"
          />
          <SubmitButton
            accent
            onClick={this.redeemVoucher}
            disabled={this.state.disableInput}
            data-test-id="redeem-voucher"
          >
            {' '}
            Submit
          </SubmitButton>
        </Wrapper>
        {this.state.error && (
          <Text pink small>
            {this.state.error}
          </Text>
        )}
      </Card>
    )
  }
}

export default RedeemVoucher
