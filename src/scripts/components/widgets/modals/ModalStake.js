import React, { Component } from 'react'
import styled from 'styled-components'
import Text from 'components/foundations/Text'
import Button from 'components/foundations/Button'
import RadioCheck from 'components/widgets/forms/RadioCheck'

type Props = {}

const Wrapper = styled.div`
  color: ${props => props.theme.colors.Modal.color};
  width: 100%;
`

const Title = styled.h2`
  color: ${props => props.theme.colors.Modal.title};
  font-size: ${props => props.theme.fonts.modal.title};
  margin-bottom: 25px;
`

const Highlight = styled(Text)`
  color: ${props => props.theme.colors.Modal.hightlight};
  margin-bottom: 14px;
`

const MainText = styled(Text)`
  margin-bottom: 35px;
`

const Anchor = Button.withComponent('a')

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  width: 100%;
`

class ModalStake extends Component<Props, void> {
  render () {
    return (
      <Wrapper>
        <Title>Stake 5 PTI</Title>
        <Highlight>
          By publishing this video you agree to make a stake deposit of 5 PTI.
          The tokens still belong to you, and can be retrieved, along with the
          video, any time.
        </Highlight>
        <MainText small>
          For now, with no monetary value, this is mostly an experiment. Soon,
          the community will curate all the content published. Well-received
          videos will see their stakes increase, earning PTIs to their creators.
          Illegal content may lose its stake. Want to know how exactly this is
          going to play out?{' '}
          <Anchor anchor purple href="./">
            Learn More
          </Anchor>
        </MainText>
        <RadioCheck checkbox name="nowarning" value="nowarning">
          Don’t show this warning again
        </RadioCheck>
        <Footer>
          <Button purple>Continue</Button>
        </Footer>
      </Wrapper>
    )
  }
}

export default ModalStake
