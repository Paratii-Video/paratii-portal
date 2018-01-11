/* @flow */

import { connect } from 'react-redux'
import RequiresLogin from './RequiresLogin'

import Profile from 'components/Profile'
import { getUser } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

const mapStateToProps = (state: RootState) => ({
  user: getUser(state)
})

const mapDispatchToProps = () => ({})

export default RequiresLogin(connect(mapStateToProps, mapDispatchToProps)(Profile), true)
