import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { getShouldKeepUrl } from 'selectors/index'
import { getIsLoggedIn } from 'selectors/UserSelectors'
import type { RootState, Location } from 'types/ApplicationTypes'

import queryString from 'query-string'

// Handle components related to login
function RequiresLogin (WrappedComponent, loginRequired) {
  type Props = {
    isLogged: boolean,
    shouldKeepUrl: boolean,
    location: Location
  }

  class RequiresLogin extends React.Component<Props, void> {
    render () {
      const defaultPages = {
        [true]: '/profile', // if user is logged in, redirects to profile if needed
        [false]: '/login' // if user is not logged in, redirects to login if needed
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
            to.search = queryString.stringify({returnPath: location.pathname, returnSearch: location.search})
          }
        } else {
          const {returnPath, returnSearch} = queryString.parse(location.search)
          if (returnPath) {
            to.pathname = returnPath
          }
          if (returnSearch) {
            to.search = returnSearch
          }
        }

        return <Redirect to={to}/>
      }
    }
  }

  const mapStateToProps = (state: RootState) => ({
    isLogged: getIsLoggedIn(state),
    shouldKeepUrl: getShouldKeepUrl(state)
  })
  const mapDispatchToProps = dispatch => ({})

  RequiresLogin.displayName = 'RequiresLogin'

  return connect(mapStateToProps, mapDispatchToProps)(RequiresLogin)
}

export default RequiresLogin
