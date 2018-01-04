/* @flow */

import { connect } from 'react-redux'

import Profile from 'components/Profile'

const mapStateToProps = () => ({
  //  TODO use redux
  profile: {name: 'John', email: 'john@test.com'}
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
