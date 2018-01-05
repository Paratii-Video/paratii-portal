import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { isLogged } from 'selectors/index'
import type { RootState } from 'types/ApplicationTypes'

function RequiresLogin (WrappedComponent, loginRequired) {
  const defaultPages = {
    [true]: '/profile',
    [false]: '/login'
  }

  type Props = {
    isLogged: boolean,
  }

  class RequiresLogin extends React.Component<Props, void> {
    render () {
      const isLogged = this.props.isLogged
      if (isLogged === loginRequired) {
        return <WrappedComponent {...this.props} />
      } else {
        return <Redirect to={defaultPages[isLogged]}/>
      }
    }
  }

  const mapStateToProps = (state: RootState) => ({
    isLogged: isLogged(state)
  })
  const mapDispatchToProps = dispatch => ({})

  RequiresLogin.displayName = 'RequiresLogin'

  return connect(mapStateToProps, mapDispatchToProps)(RequiresLogin)
}

export default RequiresLogin
