import React, { Component } from 'react'
import styled from 'styled-components'
import FilesUploaderSvg from '../foundations/svgs/FilesUploaderSvg'
import Button from 'components/foundations/buttons/Button'
import Text from 'components/foundations/Text'
import Card from 'components/structures/Card'

type Props = {
  margin: String
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

const Title = styled.h2`
  color: ${props => props.theme.colors.MainCard.title.color};
  font-size: ${props => props.theme.fonts.title.small};
  margin-bottom: 50px;
  padding: ${props => props.theme.sizes.card.padding};
  padding-bottom: 0;
`

const Icon = styled.div`
  height: 130px;
  margin: 0 0 20px;
  width: 100%;
`

const Content = styled.div`
  padding: ${props => props.theme.sizes.card.padding};
`

const TextStrong = styled(Text)`
  margin: 0 0 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 40px 48px;
`

const ArrowButton = styled(Button)`
  height: 20px;
  width: 20px;
`

const ButtonIcon = styled.svg`
  height: 80%;
  transform: ${props => (props.inverse ? 'rotateY(180deg)' : '')};
  width: 80%;
`

const Index = styled.div`
  font-size: ${props => props.theme.fonts.card.index};
  height: 20px;
  line-height: 20px;
  padding: 0 5px;
  pointer-events: none;
`

class PTIGuide extends Component<Props, void> {
  constructor (props) {
    super(props)

    this.state = {
      total: 2,
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
      <Card nopadding margin={this.props.margin}>
        <Wrapper>
          <List page={this.state.page}>
            <Item active={this.state.page === 0}>
              <Title>PTI Guide</Title>
              <Icon>
                <FilesUploaderSvg />
              </Icon>
              <Content>
                <TextStrong bold>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </TextStrong>
                <Text small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 1}>
              <Title>PTI Guide</Title>
              <Icon>
                <FilesUploaderSvg />
              </Icon>
              <Content>
                <TextStrong bold>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </TextStrong>
                <Text small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </Text>
              </Content>
            </Item>
            <Item active={this.state.page === 2}>
              <Title>PTI Guide</Title>
              <Icon>
                <FilesUploaderSvg />
              </Icon>
              <Content>
                <TextStrong bold>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </TextStrong>
                <Text small>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque vitae sapien ornare, imperdiet dolor eu,
                  vestibulum elit. Pellentesque tempor mi at purus
                </Text>
              </Content>
            </Item>
          </List>
        </Wrapper>
        <Footer>
          <ArrowButton onClick={() => this.pagination('prev')}>
            <ButtonIcon inverse>
              <use xlinkHref="#icon-arrow" />
            </ButtonIcon>
          </ArrowButton>
          <Index>
            {this.state.page + 1}/{this.state.total + 1}
          </Index>
          <ArrowButton onClick={() => this.pagination('next')}>
            <ButtonIcon>
              <use xlinkHref="#icon-arrow" />
            </ButtonIcon>
          </ArrowButton>
        </Footer>
      </Card>
    )
  }
}

export default PTIGuide
