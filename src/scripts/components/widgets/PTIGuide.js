import React, { Component } from 'react'
import styled from 'styled-components'
import { CARD_PADDING } from 'constants/UIConstants'
import PTIGuideSvg from '../foundations/svgs/PTIGuideSvg'
import TextButton from 'components/foundations/TextButton'
import SVGIcon from 'components/foundations/SVGIcon'
import Text from 'components/foundations/Text'
import Title from 'components/foundations/Title'
import Card from 'components/structures/Card'
import TranslatedText from 'components/translations/TranslatedText'

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
  color: ${props => props.theme.colors.text.highlight};
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
                <Title accent>
                  <TranslatedText message="ptiGuide.title" />
                </Title>
                <Subtitle tiny>
                  <AlertIcon>
                    <SVGIcon icon="icon-alert" />
                  </AlertIcon>
                  <TranslatedText message="ptiGuide.description" />
                </Subtitle>
              </Header>
              <Icon>
                <PTIGuideSvg />
              </Icon>
              <Content>
                <ContentTitle big highlight>
                  <TranslatedText message="ptiGuide.callToAction" />
                </ContentTitle>
              </Content>
            </Item>
            <Item active={this.state.page === 1}>
              <Header>
                <Title accent>
                  <TranslatedText message="ptiGuide.ptiGuide" />
                </Title>
              </Header>
              <Content>
                <TextStrong>
                  <TranslatedText message="ptiGuide.steps.token.mainContent" />
                </TextStrong>
                <Text gray small>
                  <TranslatedText message="ptiGuide.steps.token.subContent" />
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 2}>
              <Header>
                <Title accent>
                  <TranslatedText message="ptiGuide.ptiGuide" />
                </Title>
              </Header>
              <Content>
                <TextStrong>
                  <TranslatedText message="ptiGuide.steps.staking.mainContent" />
                </TextStrong>
                <Text gray small>
                  <TranslatedText message="ptiGuide.steps.staking.subContent" />
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 3}>
              <Header>
                <Title accent>
                  <TranslatedText message="ptiGuide.ptiGuide" />
                </Title>
              </Header>
              <Content>
                <TextStrong>
                  <TranslatedText message="ptiGuide.steps.flagging.mainContent" />
                </TextStrong>
                <Text gray small>
                  <TranslatedText message="ptiGuide.steps.flagging.subContent" />
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 4}>
              <Header>
                <Title accent>
                  <TranslatedText message="ptiGuide.ptiGuide" />
                </Title>
              </Header>
              <Content>
                <TextStrong>
                  <TranslatedText message="ptiGuide.steps.conclusion.mainContent" />
                </TextStrong>
                <Text gray small>
                  <TranslatedText
                    message="ptiGuide.steps.conclusion.subContent_html"
                    options={{
                      getInTouchEmailLink: (
                        <Anchor
                          anchor
                          purple
                          href="mailto:we@paratii.video"
                          target="_blank"
                        >
                          <TranslatedText message="ptiGuide.steps.conclusion.getInTouch" />
                        </Anchor>
                      )
                    }}
                  />
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
              <SVGIcon icon="icon-arrow-horizontal" />
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
              <SVGIcon icon="icon-arrow-horizontal" />
            </ButtonIcon>
          </ArrowButton>
        </Footer>
      </Card>
    )
  }
}

export default PTIGuide
