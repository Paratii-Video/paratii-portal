/* @flow */

import React, { Component } from "react";
import styled from "styled-components";
import CreatePlayer from "paratii-mediaplayer";

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

const Player = styled.div``;

class Play extends Component<Props, void> {
  constructor(props: Props): void {
    super(props);

    if (this.props.match.params.id) {
      this.props.setVideoId(this.props.match.params.id);
      this.props.fetchVideo(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.videoId && nextProps.videoId !== this.props.videoId) {
      CreatePlayer({
        selector: "#player",
        source:
          "https://gateway.paratii.video/ipfs/" +
          nextProps.videoId +
          "/master.m3u8",
        mimeType: "video/mp4",
        ipfsHash: nextProps.videoId
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <Title>Play Video:</Title>
        <Player id="player" />
      </Wrapper>
    );
  }
}

export default Play;
