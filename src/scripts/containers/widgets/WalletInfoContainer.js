/* @flow */

import { connect } from 'react-redux'
import { show } from 'react-notification-system-redux'

import WalletInfo from 'components/widgets/WalletInfo'

const mapDispatchToProps = {
  showNotification: show
}

export default connect(undefined, mapDispatchToProps)(WalletInfo)
