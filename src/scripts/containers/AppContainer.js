/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUploaderBusyVideos } from 'selectors/UploaderSelectors'
import App from 'components/App'
import { initializeApp } from 'actions/AppActions'
import type { RootState } from 'types/ApplicationTypes'
import { getUserAddress } from 'selectors/UserSelectors'

const mapStateToProps = (state: RootState) => ({
  videos: getUploaderBusyVideos(state),
  userAddress: getUserAddress(state)
})

const mapDispatchToProps = dispatch => ({
  initializeApp: bindActionCreators(initializeApp, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
