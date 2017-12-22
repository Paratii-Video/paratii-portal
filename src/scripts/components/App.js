import React, { Component } from "react";
import styled from "styled-components";
import logo from "assets/img/paratii_logo.png";

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

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt="logo" />
        </Header>
      </Wrapper>
    );
  }
}

export default App;
