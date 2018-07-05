import React, { Component } from 'react'
import styled from 'styled-components'
import { CARD_PADDING } from 'constants/UIConstants'
import PTIGuideSvg from '../foundations/svgs/PTIGuideSvg'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import Card from 'components/structures/Card'

type Props = {
  margin: string,
  height: string
}

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
`

const List = styled.article`
  display: flex;
  height: 100%;
  transform: translate3d(-${props => props.page * 100}%, 0, 0);
  transition: transform 0.75s ${props => props.theme.animation.ease.smooth};
  width: 100%;
`

const Item = styled.section`
  flex: 1 0 100%;
  width: 100%;
`

const Header = styled.div`
  padding: ${CARD_PADDING};
  padding-bottom: 0;
`

const Subtitle = Text.extend`
  color: ${props => props.theme.colors.text.secondary};
`

const AlertIcon = styled.span`
  color: ${props => props.theme.colors.text.warn};
  display: inline-block;
  height: 12px;
  margin: 0 5px 0 0;
  transform: translate3d(0, 2px, 0);
  width: 12px;
`

const Icon = styled.div`
  height: 130px;
  margin: 35px 0 20px;
  width: 100%;
`

const Content = styled.div`
  padding: 40px 42px 0;
`

const ContentTitle = Text.extend`
  text-align: center;
`

const TextStrong = styled(Text)`
  margin: 0 0 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 40px 48px;
`

const ArrowButton = styled(TextButton)`
  height: 20px;
  width: 11px;
`

const ButtonIcon = styled.div`
  height: 80%;
  transform: ${props => (props.inverse ? 'rotateY(180deg)' : '')};
  width: 80%;
`

const Index = styled.div`
  font-size: ${props => props.theme.fonts.text.tiny};
  height: 20px;
  line-height: 22px;
  padding: 0 10px;
  pointer-events: none;
  user-select: none;
`

const Anchor = TextButton.withComponent('a')

class PTIGuide extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      total: 4,
      page: 0
    }

    this.pagination = this.pagination.bind(this)
  }

  pagination (direction) {
    let page = this.state.page

    page = direction === 'next' ? page + 1 : page - 1

    if (page < 0) {
      page = 0
    }

    if (page > this.state.total) {
      page = this.state.total
    }

    this.setState({
      page: page
    })
  }

  render () {
    return (
      <Card nopadding {...this.props} height={this.props.height}>
        <Wrapper>
          <List page={this.state.page}>
            <Item active={this.state.page === 0}>
              <Header>
                <Title accent>What is PTI?</Title>
                <Subtitle tiny>
                  <AlertIcon>
                    <SVGIcon icon="icon-alert" />
                  </AlertIcon>
                  Suggested reading before you upload any content
                </Subtitle>
              </Header>
              <Icon>
                <PTIGuideSvg />
              </Icon>
              <Content>
                <ContentTitle big warn>
                  Discover how to use your PTI
                </ContentTitle>
              </Content>
            </Item>
            <Item active={this.state.page === 1}>
              <Header>
                <Title accent>PTI Guide</Title>
              </Header>
              <Content>
                <TextStrong>
                  PTI is the native token of the Paratii open system. We call it
                  a &ldquo;system&rdquo; because the network executes operations
                  with PTI although nobody &ldquo;owns&rdquo; the machinery who
                  does the job.
                </TextStrong>
                <Text gray small>
                  PTI tokens are issued, distributed and collected by smart
                  contracts that live on the Ethereum blockchain. Every new
                  registered user on Paratii earns some tokens to experiment
                  with. They show up on the top right of this page (click that
                  icon!) or in our embedded player, when one is watching through
                  other sites. Let’s see what you can do with PTI?
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 2}>
              <Header>
                <Title accent>PTI Guide</Title>
              </Header>
              <Content>
                <TextStrong>
                  The basic operation here is staking. Whenever you upload a
                  video, 5 of your tokens will be automatically &ldquo;attached
                  to it&rdquo;, as it enters the system. Think of it as a
                  security deposit.
                </TextStrong>
                <Text gray small>
                  At any time, you will be able to retrieve your tokens back,
                  which also delists the video from this web portal and related
                  interfaces. On the other hand, those who leave tokens staked
                  are continuously granted rewards, issued through inflation,
                  and can also earn profits if the playlists their videos belong
                  to are performing well (these two functions are not live yet).
                  So uploading content and staking are forms of active
                  participation in this economy.
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 3}>
              <Header>
                <Title accent>PTI Guide</Title>
              </Header>
              <Content>
                <TextStrong>
                  Videos will be subject to “flags”. Flagging a video means
                  matching its stake, by putting up an equivalent amount for
                  challenge.
                </TextStrong>
                <Text gray small>
                  Any user can then go in favour or disfavour that video’s
                  presence on the system. Videos collectively rejected lose
                  their stakes - forfeited PTI go to voters in the challenge
                  (people who flagged or disapproved) and to all people actively
                  staking tokens in the system, at the moment. That means that
                  keeping a well curated record of videos - one that keeps
                  attracting creators and spitting out harmful content - can be
                  a profitable activity to the system&apos;s participants.
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 4}>
              <Header>
                <Title accent>PTI Guide</Title>
              </Header>
              <Content>
                <TextStrong>
                  Soon, PTI will also be usable for facilitating micro payments.
                  Creators will have monetisation options to directly receive
                  value from their audiences and/or advertisers.
                </TextStrong>
                <Text gray small>
                  Most important for now is that you understand PTI as an entry
                  ticket to take part in an economy that belongs to you as much
                  as you are willing to belong to it. Tokens displayed here are
                  in a test environment still, and have no monetary value. If
                  you&apos;re willing to claim some extra test PTI, ask
                  questions, or make suggestions about the token&apos;s feature
                  set itself, don&apos;t hesitate to{' '}
                  <Anchor
                    anchor
                    accent
                    href="mailto:we@paratii.video"
                    target="_blank"
                  >
                    get in touch.
                  </Anchor>
                </Text>
              </Content>
            </Item>
          </List>
        </Wrapper>
        <Footer>
          <ArrowButton
            onClick={() => this.pagination('prev')}
            disabled={this.state.page === 0}
          >
            <ButtonIcon inverse>
              <SVGIcon white icon="icon-arrow" />
            </ButtonIcon>
          </ArrowButton>
          <Index>
            {this.state.page + 1}/{this.state.total + 1}
          </Index>
          <ArrowButton
            onClick={() => this.pagination('next')}
            disabled={this.state.page >= this.state.total}
          >
            <ButtonIcon>
              <SVGIcon white icon="icon-arrow" />
            </ButtonIcon>
          </ArrowButton>
        </Footer>
      </Card>
    )
  }
}

export default PTIGuide
