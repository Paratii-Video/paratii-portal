/* @flow */

import { connect } from 'react-redux'

import TipButton from 'components/tipping/TipButton'

import { setUserIsTipping } from 'actions/TippingActions'

const mapDispatchToProps = {
  setUserIsTipping
}

export default connect(undefined, mapDispatchToProps)(TipButton)
