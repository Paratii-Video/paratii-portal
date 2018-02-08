import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SignupFormContainer from 'containers/SignupFormContainer'
import Anchor from 'components/foundations/buttons/Anchor'
import Card from 'components/structures/Card'

const FooterText = styled.p`
  font-size: ${props => props.theme.fonts.text.small};
`
const NavLink = Anchor.withComponent(Link)

class Signup extends Component {
  render () {
    return (
      <div>
        <Card
          title="Sign up"
          footer={
            <FooterText>
              Already have an account?
              <NavLink underline="true" to="/login">
                Log in
              </NavLink>
            </FooterText>
          }
        >
          <SignupFormContainer />
        </Card>
      </div>
    )
  }
}

export default Signup
