import React, { Component } from "react";
import styled from "styled-components";

import type { RouteMatch } from "types/ApplicationTypes";

type Props = {
  match: RouteMatch,
  setVideoId: (id: string) => void,
  videoId: ?string
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
  constructor(props: Props) {
    super(props);

    if (this.props.match.params.id) {
      this.props.setVideoId(this.props.match.params.id);
    }
  }

  render() {
    return (
      <Wrapper>
        <Title>Play Video:</Title>
      </Wrapper>
    );
  }
}

export default Play;
