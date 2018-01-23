/* @flow */

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import UploadContainer from 'containers/UploadContainer'
import SignupContainer from 'containers/SignupContainer'
import LoginContainer from 'containers/LoginContainer'
import ProfileContainer from 'containers/ProfileContainer'
import PlayContainer from 'containers/PlayContainer'
import DebugContainer from 'containers/DebugContainer'

import type { RouteMatch } from 'types/ApplicationTypes'
import { setupKeystore } from 'utils/ParatiiLib'

import { Fonts, Sizes, Themes } from './foundations/Settings'
import Svgs from './foundations/Svgs'
import MainHeader from './containers/MainHeader'

//

type Props = {
  match: RouteMatch
};

// Paratii Themes

const paratiiTheme = {
  fonts: Fonts,
  sizes: Sizes,
  colors: Themes.dark
}

//

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.body.background};
  font-family: ${props => props.theme.fonts.family ? props.theme.fonts.family : 'Monospace'}, sans-serif;
  height: 100%;
`
//

class App extends Component<Props, void> {
  render () {
    const { match } = this.props
    setupKeystore()
    return (
      <ThemeProvider theme={paratiiTheme}>
        <Wrapper>
          <Svgs/>
          <MainHeader/>

          <Route
            exact path='/'
            component={DebugContainer}
          />
          <Route
            path={`${match.url}uploader`}
            component={UploadContainer}
          />
          <Route
            path={`${match.url}signup`}
            component={SignupContainer}
          />
          <Route
            path={`${match.url}login`}
            component={LoginContainer}
          />
          <Route
            path={`${match.url}profile`}
            component={ProfileContainer}
          />
          <Route path={`${match.url}play/:id`} component={PlayContainer} />
          <Route
            path={`${match.url}debug`}
            component={DebugContainer}
          />
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default App
