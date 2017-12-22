import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Title = styled.header`
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
`;

class UploadFile extends Component {
  render() {
    return (
      <Wrapper>
        <Title>Upload File</Title>
      </Wrapper>
    );
  }
}

export default UploadFile;
