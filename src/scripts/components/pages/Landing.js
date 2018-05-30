import React, { Component } from 'react'
import styled from 'styled-components'
import Title from '../foundations/Title'
import Text from '../foundations/Text'
import FilesUploader from '../../containers/FileUploaderContainer'
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  align-items: center;
  background: ${props => props.theme.colors.LandingPage.headerBackground}
    url(${props => props.background}) no-repeat 50%;
  background-size: cover;
  display: flex;
  height: calc(100vh - 69px);
  justify-content: center;
  position: relative;
`

const HeaderSVGBackground = styled.svg`
  display: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const HeaderContent = styled.div`
  align-items: center;
  background: ${props =>
    props.theme.colors.LandingPage.headerContentBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  padding: 100px 40px 30px;
  width: calc(100% - 40px);
`

const HeaderContentWrapper = styled.div`
  max-width: 500px;
  text-align: center;
  width: 100%;
`

const Videos = styled.div`
  background: ${props => props.theme.colors.LandingPage.videosBackground};
  height: calc(100vh - 69px);
`

class Landing extends Component {
  render () {
    return (
      <Wrapper>
        <Header background="https://www.walldevil.com/wallpapers/a78/875-bridge-woman.jpg">
          <HeaderContent>
            <HeaderContentWrapper>
              <Title huge bold>
                Bring your videos<br /> to the future
              </Title>
              <Text gray big>
                Decentralisation is breeding novel monetization models and
                giving the power back to peers.
              </Text>
            </HeaderContentWrapper>
            <FilesUploader />
          </HeaderContent>

          <HeaderSVGBackground viewbox="0 0 500 500">
            <defs>
              <filter
                id="blur"
                x="0"
                y="0"
                height="100%"
                width="100%"
                primitiveUnits="userSpaceOnUse"
              >
                <feGaussianBlur
                  x="25%"
                  y="25%"
                  width="50%"
                  height="50%"
                  stdDeviation="10"
                  in="SourceGraphic"
                  result="blurImg"
                />
                <feComponentTransfer in="blurImg" result="opaqueBlur">
                  <feFuncA type="linear" intercept="1" />
                </feComponentTransfer>
                <feBlend mode="normal" in="opaqueBlur" in2="SourceGraphic" />
              </filter>
            </defs>
            <image
              filter="url(#blur)"
              width="100%"
              height="100%"
              xlinkHref="https://www.walldevil.com/wallpapers/a78/875-bridge-woman.jpg"
            />
          </HeaderSVGBackground>
        </Header>
        <Videos />
      </Wrapper>
    )
  }
}

export default Landing
