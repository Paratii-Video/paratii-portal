import React, { Component } from "react";
import styled from "styled-components";

import type { RouteMatch } from "types/ApplicationTypes";

type Props = {
  match: RouteMatch
};

const Wrapper = styled.div`
  font-size: 20px;
`;

const Title = styled.header`
  background-color: #fff;
  height: 50px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: blue;
`;

class Play extends Component<Props, void> {
  render() {
    return (
      <Wrapper>
        <Title>Play Video:</Title>
      </Wrapper>
    );
  }
}

export default Play;
