import React, { Component } from 'react'
import styled from 'styled-components'

import NavLink from 'components/foundations/buttons/NavLink'
import type { VideoRecord } from 'records/VideoRecords'
import VideoProgressBar from 'components/widgets/VideoForm/VideoProgressBar'

type Props = {
  video: VideoRecord,
  onClick: (id: string) => void
}

const Label = styled.div`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`

const ListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px 50px 0;
  transition: opacity ${props => props.theme.animation.time.repaint};

  &:nth-child(odd) {
    background-color: ${props => props.theme.colors.VideoList.background};
  }

  &:hover {
    opacity: ${props => props.theme.animation.opacity.hover};
  }
`

const ListItemWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    display: block;
    height 20px;
    width: 100%;
  }
`

const ListItemFileName = styled.h4`
  color: ${props => props.theme.colors.VideoList.filename};
  font-size: ${props => props.theme.fonts.video.list.filename};
  margin-bottom: 4px;
`

const ListItemStatus = styled.p`
  color: ${props =>
    props.done
      ? props.theme.colors.VideoList.done
      : props.theme.colors.VideoList.status};
  font-size: ${props => props.theme.fonts.video.list.status};
  font-weight: ${props =>
    props.done
      ? props.theme.fonts.weight.bold
      : props.theme.fonts.weight.regular};
  margin-bottom: 2px;
`

const Bar = VideoProgressBar.extend`
  bottom: 0;
  position: absolute;
`

class UploadListItem extends Component<Props, void> {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.video.id)
  }

  render () {
    const item = this.props.video
    let progress = 0
    if (item.getIn(['uploadStatus', 'name']) === 'running') {
      progress = item.getIn(['uploadStatus', 'data', 'progress'])
    }
    let linkToVideo = ''
    // TODO; find out why getIn(['blockchainStatus', 'name']) is undefined
    if (
      item.getIn(['transcodingStatus', 'name']) === 'success' &&
      item.getIn(['blockchainStatus']).name === 'success'
    ) {
      const link = `/play/${item.id}`
      linkToVideo = (
        <Label>
          <h3>Link</h3>
          <NavLink to={link}>Play video</NavLink>
        </Label>
      )
    }

    return (
      <ListItem onClick={this.handleClick} id="video-list-item-{item.id}">
        <ListItemWrapper>
          <ListItemFileName>{item.filename}</ListItemFileName>
          <ListItemStatus done={progress === 0}>
            {item.uploadStatus.name} - ({progress}%)
          </ListItemStatus>
          <ListItemStatus>{item.blockchainStatus.name}</ListItemStatus>
          <ListItemStatus>
            {item.getIn(['transcodingStatus', 'name'])}
          </ListItemStatus>
          <ListItemStatus>{linkToVideo}</ListItemStatus>

          <Bar progress={'55%'} nopercentual />
        </ListItemWrapper>
      </ListItem>
    )
  }
}

export default UploadListItem
