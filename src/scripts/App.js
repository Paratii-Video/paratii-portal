import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logo from "assets/img/paratii_logo.png";

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Intro = styled.p`
  font-size: large;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const logoKeyframes = keyframes`
  100% {
    transform: scale(1.2);
  }
`;

const Logo = styled.img`
  animation: ${logoKeyframes} infinite 1s linear alternate;
  height: 80px;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title>Paratii Portal</Title>
        </Header>
        <Intro>Everything starts here..</Intro>
      </Wrapper>
    );
  }
}

export default App;
