/* @flow */

import { connect } from 'react-redux'

import Profile from 'components/Profile'
import { getUser } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  user: getUser(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
