/* @flow */

import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { isVideoWhiteListed } from 'selectors/VideoSelectors'
import SidebarTCR from 'components/widgets/tcr/SidebarTCR'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  whiteListed: isVideoWhiteListed(state)
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTCR)
