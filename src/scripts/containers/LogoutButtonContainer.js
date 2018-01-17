import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LogoutButton from 'components/LogoutButton'
import { logout } from 'actions/UserActions'
import { getIsLoggedIn } from 'selectors/UserSelectors'

import type { RootState } from 'types/ApplicationTypes'

type Props = {
  isLogged: boolean,
  logout: () => void
}

class LogoutButtonContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.logout()
  }

  render () {
    const {logout, isLogged} = this.props
    return <LogoutButton onClick={logout} isLogged={isLogged}/>
  }
}

const mapStateToProps = (state: RootState) => ({
  isLogged: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButtonContainer)
