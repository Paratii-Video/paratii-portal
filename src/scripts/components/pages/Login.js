import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LoginFormContainer from 'containers/LoginFormContainer'
import Anchor from 'components/foundations/buttons/Anchor'
import Card from 'components/structures/Card'

const FooterText = styled.p`
  font-size: ${props => props.theme.fonts.text.small};
`
const NavLink = Anchor.withComponent(Link)

class Login extends Component {
  render () {
    return (
      <div>
        <Card
          title="Login"
          footer={
            <FooterText>
              Don’t have an account?{' '}
              <NavLink underline="true" to="/signup">
                Sign up
              </NavLink>
            </FooterText>
          }
        >
          <LoginFormContainer />
        </Card>
      </div>
    )
  }
}

export default Login
