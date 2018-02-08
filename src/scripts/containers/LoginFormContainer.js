import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { Component } from 'react'

import LoginForm from 'components/LoginForm'
import { login } from 'actions/UserActions'
import { getIsLoggingIn, getIsLoggedIn } from 'selectors/UserSelectors'

import type { RootState } from 'types/ApplicationTypes'
import { RouterHistory } from 'react-router-dom'

type Props = {
  history: RouterHistory,
  isLoggingIn: boolean,
  isLoggedIn: boolean,
  requestLogin: (email: string, password: string) => void
}

class LoginFormContainer extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    if (this.props.isLoggedIn) {
      this.props.history.push('/profile')
    }
  }

  componentWillReceiveProps (nextProps: Props): void {
    if (nextProps.isLoggedIn) {
      this.props.history.push('/profile')
    }
  }

  handleInputChange (input, e) {
    this.setState({
      [input]: e.target.value
    })
  }

  handleSubmit (e) {
    const { email, password } = this.state
    e.preventDefault()
    this.props.requestLogin(email, password)
  }

  render () {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        onInputChange={this.handleInputChange}
        isLoggingIn={this.props.isLoggingIn}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  isLoggingIn: getIsLoggingIn(state),
  isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => ({
  requestLogin: bindActionCreators(login, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)
