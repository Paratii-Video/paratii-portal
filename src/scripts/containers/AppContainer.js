/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from 'components/App'
import { initializeApp } from 'actions/AppActions'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  initializeApp: bindActionCreators(initializeApp, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
