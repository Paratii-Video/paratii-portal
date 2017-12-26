/* @flow */

import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import logo from "assets/img/paratii_logo.png";

import UploadFileContainer from "containers/UploadFileContainer";
import PlayContainer from "containers/PlayContainer";

import type { RouteMatch } from "types/ApplicationTypes";

type Props = {
  match: RouteMatch
};

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
`;

class App extends Component<Props, void> {
  render() {
    const { match } = this.props;

    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt="logo" />
        </Header>
        <Route
          path={`${match.url}uploader/upload-file`}
          component={UploadFileContainer}
        />
        <Route path={`${match.url}play/:id`} component={PlayContainer} />
      </Wrapper>
    );
  }
}

export default App;
