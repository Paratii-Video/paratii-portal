import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { isLogged, shouldKeepUrl } from 'selectors/index'
import type { RootState, Location } from 'types/ApplicationTypes'

import queryString from 'query-string'

function RequiresLogin (WrappedComponent, loginRequired) {
  type Props = {
    isLogged: boolean,
    shouldKeepUrl: boolean,
    location: Location
  }

  class RequiresLogin extends React.Component<Props, void> {
    render () {
      const defaultPages = {
        [true]: '/profile',
        [false]: '/login'
      }

      const {isLogged, shouldKeepUrl, location} = this.props
      if (isLogged === loginRequired) {
        return <WrappedComponent {...this.props} />
      } else {
        const to = {
          pathname: defaultPages[isLogged]
        }
        if (!isLogged) {
          if (shouldKeepUrl) {
            to.search = queryString.stringify({returnUrl: location.pathname + location.search})
          }
        } else {
          const returnUrl = queryString.parse(location.search).returnUrl
          if (returnUrl) {
            to.pathname = returnUrl
          }
        }

        return <Redirect to={to}/>
      }
    }
  }

  const mapStateToProps = (state: RootState) => ({
    isLogged: isLogged(state),
    shouldKeepUrl: shouldKeepUrl(state)
  })
  const mapDispatchToProps = dispatch => ({})

  RequiresLogin.displayName = 'RequiresLogin'

  return connect(mapStateToProps, mapDispatchToProps)(RequiresLogin)
}

export default RequiresLogin
