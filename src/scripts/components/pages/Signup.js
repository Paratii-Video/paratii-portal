import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SignupFormContainer from 'containers/SignupFormContainer'
import Button from 'components/foundations/Button'
import Card from 'components/structures/Card'

const FooterText = styled.p`
  font-size: ${props => props.theme.fonts.text.small};
`
const NavLink = Button.withComponent(Link)

class Signup extends Component {
  render () {
    return (
      <div>
        <Card
          title="Sign up"
          footer={
            <FooterText>
              Already have an account?
              <NavLink anchor="true" to="/login">
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
