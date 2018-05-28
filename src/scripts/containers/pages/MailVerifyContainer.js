/* @flow */

import { connect } from 'react-redux'
import { show } from 'react-notification-system-redux'

import MailVerify from 'components/pages/MailVerify'

const mapDispatchToProps = {
  showNotification: show
}

export default connect(undefined, mapDispatchToProps)(MailVerify)
